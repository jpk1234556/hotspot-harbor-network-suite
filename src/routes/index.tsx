import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Router as RouterIcon,
  ShieldCheck,
  Ticket,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLockup } from "@/components/brand/logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NetBill Africa — Smart Wi-Fi Billing & Network Management" },
      {
        name: "description",
        content:
          "NetBill Africa is a Wi-Fi hotspot billing and MikroTik network management platform for Ugandan ISPs, hostels, hotels, campuses and public hotspots.",
      },
      { property: "og:title", content: "NetBill Africa — Smart Wi-Fi Billing" },
      {
        property: "og:description",
        content:
          "Vouchers, packages, mobile money and MikroTik router management in one multi-tenant platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: RouterIcon,
    title: "MikroTik router management",
    body: "Register routers per location, keep credentials encrypted, and drive provisioning from a secure server layer — never from the browser.",
  },
  {
    icon: Ticket,
    title: "Vouchers & packages",
    body: "Hourly, daily, weekly and monthly bundles with data caps, speed profiles and device limits.",
  },
  {
    icon: Wallet,
    title: "Mobile money ready",
    body: "A payment layer designed for MTN MoMo, Airtel Money, Flutterwave and Pesapal, with server-side verification.",
  },
  {
    icon: Activity,
    title: "Live network view",
    body: "Sessions, access points and router health, updating in real time.",
  },
  {
    icon: BarChart3,
    title: "Revenue & usage reports",
    body: "Daily, weekly and monthly revenue, customer growth and data consumption.",
  },
  {
    icon: ShieldCheck,
    title: "Isolated per business",
    body: "Every business gets its own customers, routers, vouchers and reports. No data ever crosses over.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <BrandLockup />
        <Button asChild size="sm">
          <Link to="/auth">Sign in</Link>
        </Button>
      </header>

      <section className="grid-glow border-y border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            Wi-Fi billing &amp; network management
          </p>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold text-balance sm:text-5xl">
            Smart Wi-Fi billing for Ugandan ISPs and hotspot operators
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Hostels, hotels, schools, restaurants, campuses and public hotspots — bill customers,
            sell vouchers, take mobile money and manage MikroTik routers from one console.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/auth">Get started</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="rounded-lg border border-border bg-card p-6">
              <feature.icon className="size-5 text-primary" />
              <h2 className="mt-4 font-display text-base font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <BrandLockup />
          <p>Built for Uganda. Ready for Africa.</p>
        </div>
      </footer>
    </div>
  );
}
