import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { initTelegram } from "@/lib/telegram";
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
    logo: vpn.url,
    hot: false,
    badge: null as string | null,
  },
  {
    name: "SHMIT VPN 2.0",
    desc: "Новое поколение VPN с белыми списками. Максимальная скорость, защита и стабильность.",
    logo: vpn2.url,
    hot: true,
    badge: "Новинка",
  },
  {
    name: "SHMIT PAY",
    desc: "Удобные платежи и пополнения",
    logo: pay.url,
    hot: false,
    badge: null,
  },
  {
    name: "SHMIT SHOP",
    desc: "Магазин одежды и аксессуаров",
    logo: shop.url,
    hot: false,
    badge: null,
  },
];

function Hub() {
  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <AppShell>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <h1 className="text-[2rem] leading-none font-extrabold tracking-tight">
            SHMIT <span className="text-brand-gradient">HUB</span>
          </h1>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
            Все проекты SHMIT в одном месте.
            <br />
            Выбери нужный и начни пользоваться.
          </p>
        </div>
        <button
          type="button"
          className="press glass-card relative grid h-11 w-11 shrink-0 place-items-center rounded-full"
        >
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute top-2.5 right-3 h-2 w-2 rounded-full bg-primary" />
        </button>
      </header>

      <div className="mt-7 grid grid-cols-2 gap-4">
        {projects.map((p) => (
          <article
            key={p.name}
            className={`press relative flex flex-col rounded-[1.75rem] p-4 ${
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
          </article>
        ))}
      </div>

      <article className="glass-card press mt-4 flex items-center gap-4 rounded-[1.75rem] p-4">
        <div className="grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center overflow-hidden rounded-[1.35rem] bg-black/40">
          <img
            src={gpt.url}
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
      </article>

      <Link to="/services" className="sr-only">
        Услуги SHMIT
      </Link>
    </AppShell>
  );
}
