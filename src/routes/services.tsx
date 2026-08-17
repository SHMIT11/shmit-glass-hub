import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { haptic } from "@/lib/telegram";
import vpn2 from "@/assets/vpn2.asset.json";
import pay from "@/assets/pay.asset.json";

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

const services = [
  { title: "SHMIT VPN 2.0", desc: "VPN + белые списки", price: "80 ₽ / месяц", logo: vpn2.url },
  { title: "SHMIT PAY", desc: "Пополнить Steam", price: null, logo: pay.url },
  { title: "SHMIT PAY", desc: "Подписка Spotify", price: null, logo: pay.url },
  { title: "SHMIT PAY", desc: "Подписка Telegram Premium", price: null, logo: pay.url },
  { title: "SHMIT PAY", desc: "Купить звёзды в Telegram ⭐️", price: null, logo: pay.url },
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

      <ul className="mt-6 space-y-3.5">
        {services.map((s, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => haptic("light")}
              className="glass-row press flex w-full items-center gap-4 rounded-[1.6rem] p-3.5 text-left"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[1.1rem] bg-black/40">
                <img
                  src={s.logo}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
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
    </AppShell>
  );
}
