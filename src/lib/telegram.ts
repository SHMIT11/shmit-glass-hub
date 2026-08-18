type TelegramWebApp = {
  ready: () => void;
  expand: () => void;
  initData?: string;
  initDataUnsafe?: { user?: TelegramUser };
  openTelegramLink?: (url: string) => void;
  setHeaderColor?: (c: string) => void;
  setBackgroundColor?: (c: string) => void;
  HapticFeedback?: { impactOccurred: (s: "light" | "medium" | "heavy") => void };
};

export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
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

export function openTelegramLink(url: string) {
  const tg = getTelegram();
  if (tg?.openTelegramLink) {
    tg.openTelegramLink(url);
    return;
  }

  window.location.assign(url);
}

export function getTelegramUser() {
  return getTelegram()?.initDataUnsafe?.user;
}

export function getTelegramInitData() {
  return getTelegram()?.initData ?? "";
}
