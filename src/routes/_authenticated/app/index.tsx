import { useEffect, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  Banknote,
  Database as DatabaseIcon,
  Radio,
  Router as RouterIcon,
  Ticket,
  Users,
  Wifi,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  dayKey,
  formatCompactMoney,
  formatData,
  formatMoney,
  relativeTime,
  shortDay,
} from "@/lib/format";

export const Route = createFileRoute("/_authenticated/app/")({
  component: Dashboard,
});

async function loadDashboard(orgId: string) {
  const since = new Date(Date.now() - 30 * 86400000).toISOString();
  const [customers, sessions, payments, vouchers, routers, aps, activity] = await Promise.all([
    supabase.from("customers").select("id, status, created_at").eq("organization_id", orgId),
    supabase
      .from("sessions")
      .select("id, status, started_at, upload_mb, download_mb")
      .eq("organization_id", orgId)
      .gte("started_at", since),
    supabase
      .from("payments")
      .select("id, amount, status, gateway, created_at, phone, reference, currency")
      .eq("organization_id", orgId)
      .gte("created_at", since)
      .order("created_at", { ascending: false }),
    supabase.from("vouchers").select("id, status").eq("organization_id", orgId),
    supabase.from("routers").select("id, name, status, last_seen").eq("organization_id", orgId),
    supabase
      .from("access_points")
      .select("id, name, status, connected_users, last_seen, group_name")
      .eq("organization_id", orgId)
      .order("name"),
    supabase
      .from("audit_logs")
      .select("id, action, result, created_at, entity_type")
      .eq("organization_id", orgId)
      .order("created_at", { ascending: false })
      .limit(8),
  ]);
  for (const r of [customers, sessions, payments, vouchers, routers, aps, activity]) {
    if (r.error) throw r.error;
  }
  return {
    customers: customers.data ?? [],
    sessions: sessions.data ?? [],
    payments: payments.data ?? [],
    vouchers: vouchers.data ?? [],
    routers: routers.data ?? [],
    aps: aps.data ?? [],
    activity: activity.data ?? [],
  };
}

const PIE_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  color: "var(--popover-foreground)",
  fontSize: 12,
};

function Dashboard() {
  const { activeOrgId, organization } = useOrganization();
  const queryClient = useQueryClient();
  const currency = organization?.currency ?? "UGX";

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard", activeOrgId],
    queryFn: () => loadDashboard(activeOrgId!),
    enabled: !!activeOrgId,
  });

  useEffect(() => {
    if (!activeOrgId) return;
    const channel = supabase
      .channel(`dashboard-${activeOrgId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "payments", filter: `organization_id=eq.${activeOrgId}` },
        () => queryClient.invalidateQueries({ queryKey: ["dashboard", activeOrgId] }),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sessions", filter: `organization_id=eq.${activeOrgId}` },
        () => queryClient.invalidateQueries({ queryKey: ["dashboard", activeOrgId] }),
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "audit_logs", filter: `organization_id=eq.${activeOrgId}` },
        () => queryClient.invalidateQueries({ queryKey: ["dashboard", activeOrgId] }),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeOrgId, queryClient]);

  const stats = useMemo(() => {
    if (!data) return null;
    const today = dayKey(new Date().toISOString());
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const ok = data.payments.filter((p) => p.status === "successful");
    const todayPayments = ok.filter((p) => dayKey(p.created_at) === today);

    const days: string[] = [];
    for (let i = 13; i >= 0; i--) days.push(dayKey(new Date(Date.now() - i * 86400000).toISOString()));
    const revenueByDay = days.map((d) => ({
      day: shortDay(d),
      revenue: ok.filter((p) => dayKey(p.created_at) === d).reduce((s, p) => s + Number(p.amount), 0),
      usage:
        data.sessions
          .filter((s) => dayKey(s.started_at) === d)
          .reduce((s, x) => s + Number(x.download_mb) + Number(x.upload_mb), 0) / 1024,
    }));

    const gatewayTotals = new Map<string, number>();
    ok.forEach((p) => {
      const key = p.gateway ?? "other";
      gatewayTotals.set(key, (gatewayTotals.get(key) ?? 0) + Number(p.amount));
    });

    return {
      totalCustomers: data.customers.length,
      activeCustomers: data.customers.filter((c) => c.status === "active").length,
      online: data.sessions.filter((s) => s.status === "active").length,
      activeVouchers: data.vouchers.filter((v) => v.status === "active" || v.status === "available").length,
      todaySales: todayPayments.length,
      todayRevenue: todayPayments.reduce((s, p) => s + Number(p.amount), 0),
      monthRevenue: ok
        .filter((p) => new Date(p.created_at) >= monthStart)
        .reduce((s, p) => s + Number(p.amount), 0),
      dataUsage: data.sessions.reduce((s, x) => s + Number(x.download_mb) + Number(x.upload_mb), 0),
      routersOnline: data.routers.filter((r) => r.status === "online").length,
      routersOffline: data.routers.filter((r) => r.status !== "online").length,
      apsOnline: data.aps.filter((a) => a.status === "online").length,
      apsTotal: data.aps.length,
      failed: data.payments.filter((p) => p.status === "failed").length,
      revenueByDay,
      gateways: [...gatewayTotals.entries()].map(([name, value]) => ({ name: gatewayLabel(name), value })),
    };
  }, [data]);

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-6 text-sm">
        Could not load dashboard: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">{organization?.name}</h1>
          <p className="text-sm text-muted-foreground">Network and billing overview · last 30 days</p>
        </div>
        {data && data.customers.length === 0 && data.routers.length === 0 ? (
          <Badge variant="outline">No data yet — load sample data in Settings</Badge>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
        <Kpi loading={isLoading} icon={Users} label="Total customers" value={stats?.totalCustomers} />
        <Kpi loading={isLoading} icon={Users} label="Active customers" value={stats?.activeCustomers} />
        <Kpi loading={isLoading} icon={Wifi} label="Online users" value={stats?.online} tone="success" />
        <Kpi loading={isLoading} icon={Ticket} label="Active vouchers" value={stats?.activeVouchers} />
        <Kpi loading={isLoading} icon={Banknote} label="Today's sales" value={stats?.todaySales} />
        <Kpi
          loading={isLoading}
          icon={Banknote}
          label="Today's revenue"
          value={stats ? formatCompactMoney(stats.todayRevenue, currency) : undefined}
        />
        <Kpi
          loading={isLoading}
          icon={Banknote}
          label="Month revenue"
          value={stats ? formatCompactMoney(stats.monthRevenue, currency) : undefined}
        />
        <Kpi
          loading={isLoading}
          icon={DatabaseIcon}
          label="Data usage"
          value={stats ? formatData(stats.dataUsage) : undefined}
        />
        <Kpi loading={isLoading} icon={RouterIcon} label="Routers online" value={stats?.routersOnline} tone="success" />
        <Kpi
          loading={isLoading}
          icon={RouterIcon}
          label="Routers offline"
          value={stats?.routersOffline}
          tone={stats && stats.routersOffline > 0 ? "danger" : undefined}
        />
        <Kpi
          loading={isLoading}
          icon={Radio}
          label="APs online"
          value={stats ? `${stats.apsOnline}/${stats.apsTotal}` : undefined}
        />
        <Kpi
          loading={isLoading}
          icon={AlertTriangle}
          label="Failed payments"
          value={stats?.failed}
          tone={stats && stats.failed > 0 ? "warning" : undefined}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Revenue · last 14 days</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            {stats ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.revenueByDay}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} width={48} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => formatMoney(v, currency)} />
                  <Area type="monotone" dataKey="revenue" stroke="var(--chart-1)" fill="url(#rev)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Payment methods</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            {stats && stats.gateways.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats.gateways} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                    {stats.gateways.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => formatMoney(v, currency)} />
                </PieChart>
              </ResponsiveContainer>
            ) : stats ? (
              <Empty text="No successful payments yet." />
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Data consumption (GB/day)</CardTitle>
          </CardHeader>
          <CardContent className="h-56">
            {stats ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.revenueByDay}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={10} tickLine={false} width={32} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v.toFixed(2)} GB`} />
                  <Bar dataKey="usage" fill="var(--chart-2)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Access points</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {!data ? (
              <Skeleton className="h-40 w-full" />
            ) : data.aps.length === 0 ? (
              <Empty text="No access points registered." />
            ) : (
              data.aps.map((ap) => (
                <div key={ap.id} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                  <div>
                    <p className="font-mono text-xs">{ap.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {ap.status === "online" ? `${ap.connected_users} users` : `Last seen ${relativeTime(ap.last_seen)}`}
                    </p>
                  </div>
                  <StatusDot status={ap.status} />
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Live activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!data ? (
              <Skeleton className="h-40 w-full" />
            ) : (
              <>
                {data.payments.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-xs">
                    <div>
                      <p>
                        Payment <span className="font-mono">{p.reference}</span>
                      </p>
                      <p className="text-muted-foreground">
                        {gatewayLabel(p.gateway ?? "")} · {relativeTime(p.created_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatMoney(Number(p.amount), p.currency)}</p>
                      <PaymentBadge status={p.status} />
                    </div>
                  </div>
                ))}
                {data.activity.slice(0, 3).map((a) => (
                  <div key={a.id} className="text-xs text-muted-foreground">
                    {a.action.replace(/[._]/g, " ")} · {relativeTime(a.created_at)}
                  </div>
                ))}
                {data.payments.length === 0 && data.activity.length === 0 ? <Empty text="No activity yet." /> : null}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function gatewayLabel(key: string) {
  const map: Record<string, string> = {
    mtn_momo: "MTN MoMo",
    airtel_money: "Airtel Money",
    flutterwave: "Flutterwave",
    pesapal: "Pesapal",
    cash: "Cash",
  };
  return map[key] ?? (key || "Other");
}

function Kpi({
  icon: Icon,
  label,
  value,
  loading,
  tone,
}: {
  icon: typeof Users;
  label: string;
  value: string | number | undefined;
  loading: boolean;
  tone?: "success" | "danger" | "warning" | undefined;
}) {
  const toneClass =
    tone === "success" ? "text-success" : tone === "danger" ? "text-destructive" : tone === "warning" ? "text-warning" : "text-foreground";
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </div>
      {loading || value === undefined ? (
        <Skeleton className="mt-2 h-7 w-16" />
      ) : (
        <p className={`mt-2 font-display text-xl font-semibold ${toneClass}`}>{value}</p>
      )}
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const online = status === "online";
  return (
    <span className={`flex items-center gap-1.5 text-[11px] font-medium ${online ? "text-success" : "text-destructive"}`}>
      <span className={`size-2 rounded-full ${online ? "bg-success" : "bg-destructive"}`} />
      {online ? "ONLINE" : "OFFLINE"}
    </span>
  );
}

function PaymentBadge({ status }: { status: string }) {
  const cls =
    status === "successful"
      ? "text-success"
      : status === "failed"
        ? "text-destructive"
        : status === "pending"
          ? "text-warning"
          : "text-muted-foreground";
  return <span className={`text-[11px] capitalize ${cls}`}>{status}</span>;
}

function Empty({ text }: { text: string }) {
  return <div className="flex h-full items-center justify-center py-6 text-xs text-muted-foreground">{text}</div>;
}
