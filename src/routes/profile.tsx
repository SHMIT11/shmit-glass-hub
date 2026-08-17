import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";
import { AppShell } from "@/components/AppShell";

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
  return (
    <AppShell>
      <h1 className="text-[2rem] leading-none font-extrabold tracking-tight">
        Профиль <span className="text-brand-gradient">SHMIT</span>
      </h1>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
        Здесь будут твои данные и подписки.
      </p>

      <div className="glass-card mt-6 flex items-center gap-4 rounded-[1.75rem] p-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[1.1rem] bg-black/40">
          <User className="h-7 w-7 text-primary" />
        </span>
        <span className="min-w-0">
          <span className="block text-[1.02rem] font-bold">Гость</span>
          <span className="mt-0.5 block text-[0.85rem] text-muted-foreground">
            Открой приложение в Telegram
          </span>
        </span>
      </div>
    </AppShell>
  );
}
