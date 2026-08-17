type TelegramWebApp = {
  ready: () => void;
  expand: () => void;
  setHeaderColor?: (c: string) => void;
  setBackgroundColor?: (c: string) => void;
  HapticFeedback?: { impactOccurred: (s: "light" | "medium" | "heavy") => void };
};

export function getTelegram(): TelegramWebApp | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { Telegram?: { WebApp?: TelegramWebApp } }).Telegram?.WebApp;
}

export function initTelegram() {
  const tg = getTelegram();
  if (!tg) return;
  tg.ready();
  tg.expand();
  tg.setHeaderColor?.("#0a0908");
  tg.setBackgroundColor?.("#0a0908");
}

export function haptic(style: "light" | "medium" | "heavy" = "light") {
  getTelegram()?.HapticFeedback?.impactOccurred(style);
}
