export function formatMoney(value: number, currency = "UGX") {
  const rounded = Math.round(value);
  return `${currency} ${rounded.toLocaleString("en-UG")}`;
}

export function formatCompactMoney(value: number, currency = "UGX") {
  if (Math.abs(value) >= 1_000_000) return `${currency} ${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `${currency} ${(value / 1_000).toFixed(1)}K`;
  return `${currency} ${Math.round(value)}`;
}

export function formatData(megabytes: number) {
  if (megabytes >= 1_048_576) return `${(megabytes / 1_048_576).toFixed(2)} TB`;
  if (megabytes >= 1024) return `${(megabytes / 1024).toFixed(2)} GB`;
  return `${megabytes.toFixed(1)} MB`;
}

export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  if (minutes < 1440) return `${Math.round(minutes / 60)} hr`;
  return `${Math.round(minutes / 1440)} days`;
}

export function relativeTime(value: string | null | undefined) {
  if (!value) return "never";
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  return `${Math.round(hours / 24)} d ago`;
}

export function dayKey(value: string) {
  return new Date(value).toISOString().slice(0, 10);
}

export function shortDay(key: string) {
  return new Date(key).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}
