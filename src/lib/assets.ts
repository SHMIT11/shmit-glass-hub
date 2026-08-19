export function assetUrl(url: string) {
  return `${import.meta.env.BASE_URL}${url.replace(/^\/+/, "")}`;
}
