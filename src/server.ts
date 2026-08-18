import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

type D1Database = {
  prepare: (query: string) => {
    bind: (...values: unknown[]) => {
      first: <T>() => Promise<T | null>;
      run: () => Promise<unknown>;
    };
    first: <T>() => Promise<T | null>;
    run: () => Promise<unknown>;
  };
};

type TelegramProfile = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      if (new URL(request.url).pathname === "/api/profile" && request.method === "POST") {
        return await handleProfile(request, env);
      }
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

async function handleProfile(request: Request, env: unknown) {
  const payload = (await request.json().catch(() => null)) as { initData?: string } | null;
  const token = getEnvValue(env, "TELEGRAM_BOT_TOKEN");
  const database = getEnvValue(env, "DB") as D1Database | undefined;

  if (!token || !database || !payload?.initData) {
    return json({ error: "Telegram profile backend is not configured" }, 503);
  }

  const user = await validateTelegramInitData(payload.initData, token);
  if (!user) return json({ error: "Invalid Telegram initData" }, 401);

  await database
    .prepare(
      "CREATE TABLE IF NOT EXISTS telegram_profiles (telegram_id INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT, username TEXT, photo_url TEXT, updated_at TEXT NOT NULL)",
    )
    .run();
  await database
    .prepare(
      "INSERT INTO telegram_profiles (telegram_id, first_name, last_name, username, photo_url, updated_at) VALUES (?, ?, ?, ?, ?, datetime('now')) ON CONFLICT(telegram_id) DO UPDATE SET first_name=excluded.first_name, last_name=excluded.last_name, username=excluded.username, photo_url=excluded.photo_url, updated_at=excluded.updated_at",
    )
    .bind(
      user.id,
      user.first_name,
      user.last_name ?? null,
      user.username ?? null,
      user.photo_url ?? null,
    )
    .run();

  const profile = await database
    .prepare(
      "SELECT telegram_id AS id, first_name, last_name, username, photo_url FROM telegram_profiles WHERE telegram_id = ?",
    )
    .bind(user.id)
    .first<TelegramProfile>();

  return json({ profile });
}

function getEnvValue(env: unknown, key: string) {
  if (!env || typeof env !== "object") return undefined;
  return (env as Record<string, unknown>)[key];
}

async function validateTelegramInitData(initData: string, token: string) {
  const params = new URLSearchParams(initData);
  const receivedHash = params.get("hash");
  const authDate = Number(params.get("auth_date"));
  if (!receivedHash || !authDate || Date.now() / 1000 - authDate > 86400) return null;

  params.delete("hash");
  const dataCheckString = [...params.entries()]
    .sort(([first], [second]) => first.localeCompare(second))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  const secretKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(token),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const secret = await crypto.subtle.sign(
    "HMAC",
    secretKey,
    new TextEncoder().encode("WebAppData"),
  );
  const dataKey = await crypto.subtle.importKey(
    "raw",
    secret,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const calculated = bytesToHex(
    new Uint8Array(
      await crypto.subtle.sign("HMAC", dataKey, new TextEncoder().encode(dataCheckString)),
    ),
  );
  if (!constantTimeEqual(calculated, receivedHash)) return null;

  try {
    return JSON.parse(params.get("user") ?? "") as TelegramProfile;
  } catch {
    return null;
  }
}

function bytesToHex(bytes: Uint8Array) {
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function constantTimeEqual(first: string, second: string) {
  if (first.length !== second.length) return false;
  let difference = 0;
  for (let index = 0; index < first.length; index++)
    difference |= first.charCodeAt(index) ^ second.charCodeAt(index);
  return difference === 0;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
