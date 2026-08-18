import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { ShootingStars } from "./ShootingStars";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ShootingStars />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-24 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.66 0.21 42 / 22%), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.66 0.21 42 / 14%), transparent 70%)" }}
      />
      <main className="screen-in relative mx-auto w-full max-w-md px-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-36">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
