import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { BrandLockup } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/_authenticated/app/onboarding")({
  component: Onboarding,
});

function Onboarding() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [demo, setDemo] = useState(true);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const { data: orgId, error } = await supabase.rpc("create_organization", {
      _name: name,
      _phone: phone || undefined,
      _email: email || undefined,
    });
    if (error || !orgId) {
      setBusy(false);
      toast.error(error?.message ?? "Could not create business");
      return;
    }
    if (demo) {
      const { error: seedError } = await supabase.rpc("seed_demo_data", { _org: orgId });
      if (seedError) toast.error(`Business created, but sample data failed: ${seedError.message}`);
    }
    window.localStorage.setItem("netbill.active-org", orgId);
    await queryClient.invalidateQueries({ queryKey: ["memberships"] });
    toast.success("Business created");
    navigate({ to: "/app", replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center grid-glow p-6">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8">
        <BrandLockup showTagline />
        <h1 className="mt-8 font-display text-2xl font-semibold">Set up your business</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Each business gets its own customers, routers, vouchers and reports.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="org-name">Business name</Label>
            <Input
              id="org-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Bethel Hostel Wi-Fi"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="org-phone">Support phone</Label>
              <Input id="org-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07XXXXXXXX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-email">Support email</Label>
              <Input id="org-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <label className="flex items-start gap-3 rounded-md border border-border p-3 text-sm">
            <Checkbox checked={demo} onCheckedChange={(v) => setDemo(v === true)} className="mt-0.5" />
            <span>
              <span className="font-medium">Fill with sample data</span>
              <span className="block text-muted-foreground">
                Adds labelled demo locations, a router, 4 access points, 5 packages, customers,
                vouchers and payments so you can explore. Remove anytime.
              </span>
            </span>
          </label>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Creating…" : "Create business"}
          </Button>
        </form>
      </div>
    </div>
  );
}
