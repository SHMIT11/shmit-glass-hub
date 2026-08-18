import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Send,
  Shirt,
  Sparkles,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { haptic, openTelegramLink } from "@/lib/telegram";
import vpn2 from "@/assets/vpn2.asset.json";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Услуги SHMIT — VPN, Steam, Spotify, Telegram Premium" },
      {
        name: "description",
        content:
          "Оформи услуги SHMIT прямо в приложении: VPN 2.0, пополнение Steam, подписки Spotify и Telegram Premium, звёзды Telegram.",
      },
      { property: "og:title", content: "Услуги SHMIT" },
      {
        property: "og:description",
        content: "Выбери нужную услугу и оформи всё прямо в приложении.",
      },
    ],
  }),
  component: Services,
});

const groups: {
  title: string;
  items: {
    title: string;
    desc: string;
    price?: string;
    logo?: string;
    icon?: LucideIcon;
    url: string;
  }[];
}[] = [
  {
    title: "Основное",
    items: [
      {
        title: "SHMIT VPN 2.0",
        desc: "VPN + белые списки",
        price: "80 ₽ / месяц",
        logo: vpn2.url,
        url: "https://t.me/SHMIT_VPN2_bot",
      },
    ],
  },
  {
    title: "SHMIT PAY",
    items: [
      {
        title: "Пополнить Steam",
        desc: "Быстрое пополнение игрового баланса",
        icon: Gamepad2,
        url: "https://t.me/SHMIT_PAY_BOT",
      },
      {
        title: "Telegram Premium",
        desc: "Официальная подписка Telegram",
        icon: Send,
        url: "https://t.me/SHMIT_PAY_BOT",
      },
      {
        title: "Пополнить Telegram Stars",
        desc: "Звёзды для Telegram",
        icon: Star,
        url: "https://t.me/SHMIT_PAY_BOT",
      },
      {
        title: "Купить подписку Spotify",
        desc: "Премиум-музыка без ограничений",
        icon: Sparkles,
        url: "https://t.me/SHMIT_PAY_BOT",
      },
    ],
  },
  {
    title: "SHMIT GPT",
    items: [
      {
        title: "Создать AI-фотосессию",
        desc: "Персональные изображения с AI",
        icon: Camera,
        url: "https://t.me/shimt_gpt_bot",
      },
    ],
  },
  {
    title: "SHMIT SHOP",
    items: [
      {
        title: "Купить стильный шмот",
        desc: "Одежда и аксессуары SHMIT",
        icon: Shirt,
        url: "https://t.me/Shmit_Shop_bot",
      },
    ],
  },
];

function Services() {
  const navigate = useNavigate();

  return (
    <AppShell>
      <button
        type="button"
        onClick={() => {
          haptic("light");
          navigate({ to: "/hub" });
        }}
        className="press glass-card grid h-11 w-11 place-items-center rounded-full"
        aria-label="Назад"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>

      <h1 className="mt-5 text-[2rem] leading-none font-extrabold tracking-tight">
        Услуги <span className="text-brand-gradient">SHMIT</span>
      </h1>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
        Выбери нужную услугу и оформи
        <br />
        всё прямо в приложении.
      </p>

      <div className="mt-6 space-y-7">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="mb-3 px-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {group.title}
            </h2>
            <ul className="space-y-3.5">
              {group.items.map((s) => (
                <li key={`${group.title}-${s.title}-${s.desc}`}>
                  <button
                    type="button"
                    onClick={() => {
                      haptic("light");
                      openTelegramLink(s.url);
                    }}
                    className="glass-row press flex w-full items-center gap-4 rounded-[1.6rem] p-3.5 text-left"
                  >
                    <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[1.1rem] bg-black/40">
                      {s.logo ? (
                        <img
                          src={s.logo}
                          alt={s.title}
                          loading="lazy"
                          className="h-full w-full object-contain"
                        />
                      ) : s.icon ? (
                        <s.icon className="h-6 w-6 text-primary" strokeWidth={1.8} />
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[1.02rem] font-bold">{s.title}</span>
                      <span className="mt-0.5 block truncate text-[0.85rem] text-muted-foreground">
                        {s.desc}
                      </span>
                      {s.price ? (
                        <span className="mt-0.5 block text-[0.85rem] font-semibold text-primary">
                          {s.price}
                        </span>
                      ) : null}
                    </span>
                    <span className="glass-card grid h-9 w-9 shrink-0 place-items-center rounded-full">
                      <ChevronRight className="h-4 w-4 text-foreground" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
