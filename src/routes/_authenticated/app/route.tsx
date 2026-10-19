import { useEffect, useState } from "react";
import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  BarChart3,
  Building2,
  FileClock,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  MonitorSmartphone,
  Router as RouterIcon,
  Settings,
  Ticket,
  Users,
  Wallet,
  Wifi,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { OrganizationProvider, ROLE_LABELS, useOrganization } from "@/hooks/use-organization";
import { BrandLockup } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Console — NetBill Africa" },
      { name: "description", content: "NetBill Africa operator console." },
      { property: "og:title", content: "Console — NetBill Africa" },
      { property: "og:description", content: "NetBill Africa operator console." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AppLayout,
});

function AppLayout() {
  return (
    <OrganizationProvider>
      <Shell />
    </OrganizationProvider>
  );
}

const LIVE = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/audit", label: "Audit logs", icon: FileClock },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

const UPCOMING = [
  { label: "Routers & APs", icon: RouterIcon },
  { label: "Live clients", icon: Wifi },
  { label: "Packages & vouchers", icon: Ticket },
  { label: "Payments", icon: Wallet },
  { label: "Customers", icon: Users },
  { label: "Agents", icon: Activity },
  { label: "SMS & WhatsApp", icon: Megaphone },
  { label: "Captive portal", icon: MonitorSmartphone },
  { label: "Reports", icon: BarChart3 },
];

function Shell() {
  const { memberships, isLoading, activeOrgId, setActiveOrgId, organization, role } =
    useOrganization();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!isLoading && memberships.length === 0 && pathname !== "/app/onboarding") {
      navigate({ to: "/app/onboarding", replace: true });
    }
  }, [isLoading, memberships.length, pathname, navigate]);

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (pathname === "/app/onboarding") return <Outlet />;

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between px-5">
        <BrandLockup />
        <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
          <X className="size-5" />
        </button>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {LIVE.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: "exact" in item }}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
              activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground font-medium" }}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <p className="px-3 pb-2 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            Coming in next stages
          </p>
          <div className="space-y-1">
            {UPCOMING.map((item) => (
              <div
                key={item.label}
                className="flex cursor-not-allowed items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground/60"
              >
                <item.icon className="size-4" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <Button variant="ghost" className="w-full justify-start gap-3" onClick={signOut}>
          <LogOut className="size-4" /> Sign out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen lg:pl-64">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border bg-sidebar lg:block">
        {sidebar}
      </aside>
      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-background/80" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 border-r border-sidebar-border bg-sidebar">
            {sidebar}
          </aside>
        </div>
      ) : null}

      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur sm:px-6">
        <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="size-5" />
        </button>
        <Building2 className="hidden size-4 text-muted-foreground sm:block" />
        {isLoading ? (
          <Skeleton className="h-9 w-56" />
        ) : (
          <Select value={activeOrgId ?? ""} onValueChange={setActiveOrgId}>
            <SelectTrigger className="w-56 sm:w-72">
              <SelectValue placeholder="Select business" />
            </SelectTrigger>
            <SelectContent>
              {memberships.map((m) => (
                <SelectItem key={m.organization_id} value={m.organization_id}>
                  {m.organizations?.name ?? "Business"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className="ml-auto flex items-center gap-2">
          {organization?.is_demo ? <Badge variant="outline">Demo</Badge> : null}
          {role ? <Badge variant="secondary">{ROLE_LABELS[role]}</Badge> : null}
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link to="/app/onboarding">New business</Link>
          </Button>
        </div>
      </header>

      <main className={cn("mx-auto max-w-7xl p-4 sm:p-6")}>
        {organization ? (
          <Outlet />
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-32 w-full" />
          </div>
        )}
      </main>
    </div>
  );
}
