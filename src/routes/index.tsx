import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import sphere from "@/assets/sphere.jpg";
import { haptic, initTelegram } from "@/lib/telegram";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SHMIT HUB — все проекты SHMIT в одном месте" },
      {
        name: "description",
        content:
          "SHMIT HUB — Telegram Mini App с проектами SHMIT VPN, VPN 2.0, PAY, SHOP и GPT в одном премиальном интерфейсе.",
      },
      { property: "og:title", content: "SHMIT HUB — все проекты SHMIT в одном месте" },
      {
        property: "og:description",
        content: "Цифровые решения SHMIT: VPN, платежи, магазин и AI — прямо в Telegram.",
      },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const navigate = useNavigate();
  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <ShootingStars />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.66 0.21 42 / 25%), transparent 70%)" }}
      />
      <div className="screen-in relative mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-1 items-center justify-center">
          <img
            src={sphere}
            alt="Светящаяся оранжевая сфера из частиц SHMIT"
            width={1024}
            height={1024}
            className="float-slow w-full max-w-[22rem] select-none"
          />
        </div>

        <div className="pb-8">
          <p className="text-base text-muted-foreground">Добро пожаловать в</p>
          <h1 className="mt-1 text-[3.1rem] leading-[0.95] font-extrabold tracking-tight">
            <span className="block text-foreground">SHMIT</span>
            <span className="text-brand-gradient block">COMPANY</span>
          </h1>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
            Мы создаём цифровые решения
            <br />
            для тебя и твоего комфорта.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            haptic("medium");
            navigate({ to: "/hub" });
          }}
          className="press cta-gradient flex h-[4.25rem] w-full items-center justify-center gap-3 rounded-full px-6 text-lg font-bold text-primary-foreground"
        >
          Начать
          <span className="grid h-9 w-9 place-items-center rounded-full bg-black/20">
            <ArrowRight className="h-5 w-5" />
          </span>
        </button>
      </div>
    </div>
  );
}
