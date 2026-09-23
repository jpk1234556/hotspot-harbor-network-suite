import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 15a13 13 0 0 1 18 0" strokeLinecap="round" />
        <path d="M6.5 18.2a8.5 8.5 0 0 1 11 0" strokeLinecap="round" />
        <circle cx="12" cy="20.5" r="1.3" fill="currentColor" stroke="none" />
        <path d="M8 10V4l8 6V4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function BrandLockup({
  className,
  showTagline = false,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <BrandMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-semibold tracking-tight">
          NetBill <span className="text-primary">Africa</span>
        </span>
        {showTagline ? (
          <span className="mt-1 text-[11px] text-muted-foreground">
            Smart Wi-Fi Billing &amp; Network Management
          </span>
        ) : null}
      </span>
    </span>
  );
}
