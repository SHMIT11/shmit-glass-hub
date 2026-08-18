import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { StarTrails } from "@/components/StarTrails";
import { TypingCursor } from "@/components/TypingCursor";
import { useTypingSequence } from "@/hooks/use-typing-sequence";
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
  const { visible, activeLine } = useTypingSequence(
    [
      "Добро пожаловать в",
      "SHMIT COMPANY",
      "Мы создаём цифровые решения для тебя и твоего комфорта.",
    ],
    16,
    160,
  );
  useEffect(() => {
    initTelegram();
  }, []);

  const typedCompany = visible[1];
  const typedDescription = visible[2];
  const descriptionFirstLine = "Мы создаём цифровые решения";

  return (
    <div className="welcome-screen relative flex min-h-[100dvh] flex-col overflow-hidden bg-background">
      <StarTrails />
      <div className="screen-in relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="flex-1" aria-hidden />

        <div className="pb-8">
          <p className="text-base text-muted-foreground">
            {visible[0]}
            <TypingCursor visible={activeLine === 0} />
          </p>
          <h1 className="mt-1 text-[3.1rem] leading-[0.95] font-extrabold tracking-tight">
            <span className="block text-foreground">
              {typedCompany.slice(0, Math.min(5, typedCompany.length))}
              {activeLine === 1 && typedCompany.length <= 5 ? <TypingCursor visible /> : null}
            </span>
            <span className="text-brand-gradient block">
              {typedCompany.length > 6 ? typedCompany.slice(6) : ""}
              {activeLine === 1 && typedCompany.length > 5 ? <TypingCursor visible /> : null}
            </span>
          </h1>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
            {typedDescription.slice(0, descriptionFirstLine.length)}
            <br />
            {typedDescription.slice(descriptionFirstLine.length)}
            <TypingCursor visible={activeLine === 2} />
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            haptic("medium");
            navigate({ to: "/hub" });
          }}
          className="welcome-button press flex aspect-[2081/526] h-auto w-full items-center justify-center rounded-full px-6 text-[1.35rem] leading-none font-black text-primary-foreground"
        >
          <span className="relative -top-[5px]">Начать</span>
        </button>
      </div>
    </div>
  );
}
