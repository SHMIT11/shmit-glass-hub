import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import {
  haptic,
  getTelegramInitData,
  getTelegramUser,
  initTelegram,
  openTelegramLink,
} from "@/lib/telegram";

type ProfileData = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Профиль — SHMIT HUB" },
      { name: "description", content: "Твой профиль в SHMIT HUB: подписки и данные аккаунта." },
      { property: "og:title", content: "Профиль — SHMIT HUB" },
      { property: "og:description", content: "Твой профиль и подписки SHMIT." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(() => getTelegramUser() ?? null);

  useEffect(() => {
    initTelegram();
    const user = getTelegramUser();
    const initData = getTelegramInitData();
    if (user) setProfile(user);
    if (!initData) return;

    let cancelled = false;
    fetch("/api/profile", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ initData }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { profile?: ProfileData } | null) => {
        if (!cancelled && payload?.profile) setProfile(payload.profile);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  const displayName = profile
    ? [profile.first_name, profile.last_name].filter(Boolean).join(" ")
    : "Гость";

  return (
    <AppShell>
      <h1 className="text-[2rem] leading-none font-extrabold tracking-tight">
        Профиль <span className="text-brand-gradient">SHMIT</span>
      </h1>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
        Здесь будут твои данные и подписки.
      </p>

      <div className="glass-card mt-6 flex items-center gap-4 rounded-[1.75rem] p-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[1.1rem] bg-black/40">
          {profile?.photo_url ? (
            <img src={profile.photo_url} alt={displayName} className="h-full w-full object-cover" />
          ) : (
            <User className="h-7 w-7 text-primary" />
          )}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[1.02rem] font-bold">{displayName}</span>
          <span className="mt-0.5 block truncate text-[0.85rem] text-muted-foreground">
            {profile?.username ? `@${profile.username}` : "Открой приложение в Telegram"}
          </span>
        </span>
      </div>

      <button
        type="button"
        onClick={() => {
          haptic("light");
          openTelegramLink("https://t.me/SHMIT_VPN2_bot");
        }}
        className="glass-row press mt-4 flex w-full items-center justify-center rounded-[1.6rem] p-3.5 text-[0.95rem] font-bold"
      >
        Добавить подписку
      </button>
    </AppShell>
  );
}
