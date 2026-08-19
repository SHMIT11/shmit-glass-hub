import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { TypingCursor } from "@/components/TypingCursor";
import { useTypingSequence } from "@/hooks/use-typing-sequence";
import { assetUrl } from "@/lib/assets";
import { haptic, initTelegram, openTelegramLink } from "@/lib/telegram";
import vpn from "@/assets/vpn.asset.json";
import vpn2 from "@/assets/vpn2.asset.json";
import pay from "@/assets/pay.asset.json";
import shop from "@/assets/shop.asset.json";
import gpt from "@/assets/gpt.asset.json";

export const Route = createFileRoute("/hub")({
  head: () => ({
    meta: [
      { title: "SHMIT HUB — проекты SHMIT" },
      {
        name: "description",
        content: "Все проекты SHMIT в одном месте: VPN, VPN 2.0, PAY, SHOP и GPT.",
      },
      { property: "og:title", content: "SHMIT HUB — проекты SHMIT" },
      {
        property: "og:description",
        content: "Выбери нужный проект SHMIT и начни пользоваться прямо в Telegram.",
      },
    ],
  }),
  component: Hub,
});

const projects = [
  {
    name: "SHMIT VPN",
    desc: "Быстрый и стабильный VPN для любой сети",
    logo: assetUrl(vpn.url),
    hot: false,
    badge: null as string | null,
    url: "https://t.me/SHMIT_VPN_BOT",
  },
  {
    name: "SHMIT VPN 2.0",
    desc: "Новое поколение VPN с белыми списками.",
    logo: assetUrl(vpn2.url),
    hot: true,
    badge: "Новинка",
    url: "https://t.me/SHMIT_VPN2_bot",
  },
  {
    name: "SHMIT PAY",
    desc: "Удобные платежи и пополнения",
    logo: assetUrl(pay.url),
    hot: false,
    badge: null,
    url: "https://t.me/SHMIT_PAY_BOT",
  },
  {
    name: "SHMIT SHOP",
    desc: "Магазин одежды и аксессуаров",
    logo: assetUrl(shop.url),
    hot: false,
    badge: null,
    url: "https://t.me/Shmit_Shop_bot",
  },
];

const hubTypingLines = ["SHMIT", "HUB"];
const notificationReadKey = "shmit-hub-pay-sale-read";

function Hub() {
  const { visible: hubTitle, activeLine } = useTypingSequence(hubTypingLines, 75, 300);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationRead, setNotificationRead] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(notificationReadKey) === "true";
  });

  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <AppShell starTrails>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <h1 className="text-[2rem] leading-none font-extrabold tracking-tight">
            {hubTitle[0]} {activeLine === 0 ? <TypingCursor visible /> : null}
            <span className="text-brand-gradient">{hubTitle[1]}</span>
            {activeLine === 1 ? <TypingCursor visible /> : null}
          </h1>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
            Все проекты SHMIT в одном месте.
            <br />
            Выбери нужный и начни пользоваться.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            haptic("light");
            setNotificationOpen(true);
            setNotificationRead(true);
            window.localStorage.setItem(notificationReadKey, "true");
          }}
          className="press glass-card relative grid h-11 w-11 shrink-0 place-items-center rounded-full"
          aria-label="Открыть уведомления"
        >
          <Bell className="h-5 w-5 text-foreground" />
          {!notificationRead ? (
            <span className="absolute top-2.5 right-3 h-2 w-2 rounded-full bg-primary" />
          ) : null}
        </button>
      </header>

      <div className="mt-7 grid grid-cols-2 gap-4">
        {projects.map((p) => (
          <button
            type="button"
            key={p.name}
            onClick={() => {
              haptic("light");
              openTelegramLink(p.url);
            }}
            className={`press relative flex w-full flex-col rounded-[1.75rem] p-4 text-left ${
              p.hot ? "glass-card-hot" : "glass-card"
            }`}
          >
            {p.badge ? (
              <span className="cta-gradient absolute -top-2.5 right-3 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold text-primary-foreground">
                {p.badge}
              </span>
            ) : null}
            <div className="flex items-start justify-between">
              <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-[1.25rem] bg-black/40">
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="glass-card grid h-8 w-8 place-items-center rounded-full">
                <ChevronRight className="h-4 w-4 text-foreground" />
              </span>
            </div>
            <h2 className="mt-4 text-[1.05rem] font-bold">{p.name}</h2>
            <p className="mt-1.5 text-[0.8rem] leading-snug text-muted-foreground">{p.desc}</p>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          haptic("light");
          openTelegramLink("https://t.me/shimt_gpt_bot");
        }}
        className="glass-card press mt-4 flex w-full items-center gap-4 rounded-[1.75rem] p-4 text-left"
      >
        <div className="grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center overflow-hidden rounded-[1.35rem] bg-black/40">
          <img
            src={assetUrl(gpt.url)}
            alt="SHMIT GPT"
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-[1.05rem] font-bold">SHMIT GPT</h2>
            <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[0.6rem] font-bold tracking-wide text-primary">
              AI
            </span>
          </div>
          <p className="mt-1.5 text-[0.8rem] leading-snug text-muted-foreground">
            Генерирует изображения с помощью искусственного интеллекта
          </p>
        </div>
        <span className="glass-card grid h-8 w-8 shrink-0 place-items-center rounded-full">
          <ChevronRight className="h-4 w-4 text-foreground" />
        </span>
      </button>

      <Link to="/services" className="sr-only">
        Услуги SHMIT
      </Link>

      {notificationOpen ? (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/45 px-5 pt-[max(5rem,env(safe-area-inset-top))] backdrop-blur-[3px]">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="notification-title"
            className="glass-card relative w-full max-w-md rounded-[1.75rem] p-5 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => {
                haptic("light");
                setNotificationOpen(false);
              }}
              className="press glass-card absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full"
              aria-label="Закрыть уведомление"
            >
              <X className="h-4 w-4 text-foreground" />
            </button>

            <p className="pr-12 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Специально для вас
            </p>
            <h2
              id="notification-title"
              className="mt-3 text-[1.35rem] font-extrabold leading-tight"
            >
              Скидка на SHMIT PAY
            </h2>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-muted-foreground">
              Получите скидку на все предложения SHMIT PAY.
            </p>
            <p className="mt-4 text-[3.6rem] leading-none font-extrabold tracking-tight text-emerald-400">
              -25%
            </p>
            <button
              type="button"
              onClick={() => {
                haptic("light");
                openTelegramLink("https://t.me/SHMIT_PAY_BOT");
              }}
              className="glass-row press mt-5 flex w-full items-center justify-center rounded-[1.35rem] p-3.5 text-[0.95rem] font-bold"
            >
              Перейти в SHMIT PAY
            </button>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
