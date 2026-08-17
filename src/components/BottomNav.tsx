import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LayoutGrid, User } from "lucide-react";
import { haptic } from "@/lib/telegram";

const items = [
  { to: "/hub", label: "Главная", Icon: Home },
  { to: "/services", label: "Услуги", Icon: LayoutGrid },
  { to: "/profile", label: "Профиль", Icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="glass-dock mx-auto flex max-w-md items-center justify-around rounded-[2.25rem] px-2 py-2.5">
        {items.map(({ to, label, Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={() => haptic("light")}
              className="press flex min-w-[5.5rem] flex-col items-center gap-1 rounded-[1.75rem] px-4 py-2"
              style={
                active
                  ? {
                      backgroundImage:
                        "linear-gradient(160deg, oklch(0.66 0.21 42 / 18%), oklch(0.66 0.21 42 / 6%))",
                      border: "1px solid oklch(0.66 0.21 42 / 30%)",
                      boxShadow: "0 0 26px -10px oklch(0.66 0.21 42 / 65%)",
                    }
                  : undefined
              }
            >
              <Icon
                className={active ? "h-6 w-6 text-primary" : "h-6 w-6 text-muted-foreground"}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span
                className={
                  active
                    ? "text-[0.7rem] font-semibold text-primary"
                    : "text-[0.7rem] font-medium text-muted-foreground"
                }
              >
                {label}
              </span>
              {active ? <span className="h-1 w-1 rounded-full bg-primary" /> : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
