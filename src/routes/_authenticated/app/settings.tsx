import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ROLE_LABELS, useOrganization, type AppRole } from "@/hooks/use-organization";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/app/settings")({
  component: SettingsPage,
});

const DEMO_TABLES = [
  "sessions",
  "payments",
  "vouchers",
  "voucher_batches",
  "customer_devices",
  "customers",
  "agents",
  "access_points",
  "routers",
  "packages",
  "speed_profiles",
  "locations",
] as const;

function SettingsPage() {
  const { organization, role, activeOrgId } = useOrganization();
  const queryClient = useQueryClient();
  const isOwner = role === "org_owner" || role === "super_admin";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setName(organization?.name ?? "");
    setPhone(organization?.contact_phone ?? "");
    setEmail(organization?.contact_email ?? "");
  }, [organization]);

  const team = useQuery({
    queryKey: ["team", activeOrgId],
    enabled: !!activeOrgId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("organization_members")
        .select("id, role, user_id, created_at")
        .eq("organization_id", activeOrgId!);
      if (error) throw error;
      const ids = (data ?? []).map((m) => m.user_id);
      const { data: profiles } = await supabase.from("profiles").select("id, full_name, phone").in("id", ids);
      return (data ?? []).map((m) => ({ ...m, profile: profiles?.find((p) => p.id === m.user_id) }));
    },
  });

  const demoCount = useQuery({
    queryKey: ["demo-count", activeOrgId],
    enabled: !!activeOrgId,
    queryFn: async () => {
      const { count } = await supabase
        .from("locations")
        .select("id", { count: "exact", head: true })
        .eq("organization_id", activeOrgId!)
        .eq("is_demo", true);
      return count ?? 0;
    },
  });

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!activeOrgId) return;
    setBusy(true);
    const { error } = await supabase
      .from("organizations")
      .update({ name, contact_phone: phone || null, contact_email: email || null })
      .eq("id", activeOrgId);
    if (!error) {
      await supabase.from("audit_logs").insert({
        organization_id: activeOrgId,
        action: "organization.updated",
        entity_type: "organization",
        entity_id: activeOrgId,
      });
    }
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Business details saved");
    queryClient.invalidateQueries({ queryKey: ["memberships"] });
  }

  async function loadDemo() {
    if (!activeOrgId) return;
    setBusy(true);
    const { error } = await supabase.rpc("seed_demo_data", { _org: activeOrgId });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Sample data loaded");
    queryClient.invalidateQueries();
  }

  async function clearDemo() {
    if (!activeOrgId) return;
    setBusy(true);
    for (const table of DEMO_TABLES) {
      const { error } = await supabase.from(table).delete().eq("organization_id", activeOrgId).eq("is_demo", true);
      if (error) {
        setBusy(false);
        return toast.error(`Could not clear ${table}: ${error.message}`);
      }
    }
    await supabase.from("audit_logs").insert({
      organization_id: activeOrgId,
      action: "demo_data.cleared",
      entity_type: "organization",
      entity_id: activeOrgId,
    });
    setBusy(false);
    toast.success("Sample data removed");
    queryClient.invalidateQueries();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">Business profile, team and sample data.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Business profile</CardTitle>
          <CardDescription>Shown to customers on vouchers and the captive portal.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={save} className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2 sm:col-span-3">
              <Label htmlFor="s-name">Business name</Label>
              <Input id="s-name" value={name} onChange={(e) => setName(e.target.value)} disabled={!isOwner} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-phone">Support phone</Label>
              <Input id="s-phone" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!isOwner} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-email">Support email</Label>
              <Input id="s-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isOwner} />
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Input value={organization?.currency ?? "UGX"} disabled />
            </div>
            {isOwner ? (
              <div className="sm:col-span-3">
                <Button type="submit" disabled={busy}>Save changes</Button>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground sm:col-span-3">Only the owner can edit these details.</p>
            )}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Team</CardTitle>
          <CardDescription>People who can access this business and their role.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {team.isLoading ? (
            <Skeleton className="h-16" />
          ) : (
            team.data?.map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm">
                <div>
                  <p>{m.profile?.full_name || "Unnamed member"}</p>
                  <p className="text-xs text-muted-foreground">{m.profile?.phone ?? "—"}</p>
                </div>
                <Badge variant="secondary">{ROLE_LABELS[m.role as AppRole]}</Badge>
              </div>
            ))
          )}
          <p className="pt-2 text-xs text-muted-foreground">Inviting staff, agents and network admins arrives in a later stage.</p>
        </CardContent>
      </Card>

      {isOwner ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sample data</CardTitle>
            <CardDescription>
              Demo records for "Bethel Hostel Wi-Fi" style setups. Always marked as demo and kept separate from real records.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {demoCount.data ? (
              <Button variant="destructive" onClick={clearDemo} disabled={busy}>Remove sample data</Button>
            ) : (
              <Button onClick={loadDemo} disabled={busy}>Load sample data</Button>
            )}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
