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
      <div className="glass-dock mx-auto flex w-full max-w-md items-center rounded-[2.25rem] p-2.5">
        {items.map(({ to, label, Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={() => haptic("light")}
              className="press flex min-w-0 flex-1 flex-col items-center gap-1 rounded-[1.65rem] border border-transparent px-2 py-2"
              style={
                active
                  ? {
                      border: "1px solid oklch(0.66 0.21 42 / 30%)",
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
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
