import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type AppRole = Database["public"]["Enums"]["app_role"];
export type Organization = Database["public"]["Tables"]["organizations"]["Row"];

export type Membership = {
  id: string;
  role: AppRole;
  organization_id: string;
  organizations: Organization | null;
};

const STORAGE_KEY = "netbill.active-org";

export function useMemberships() {
  return useQuery({
    queryKey: ["memberships"],
    queryFn: async (): Promise<Membership[]> => {
      const { data, error } = await supabase
        .from("organization_members")
        .select("id, role, organization_id, organizations(*)")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as Membership[];
    },
  });
}

type OrgContextValue = {
  memberships: Membership[];
  activeOrgId: string | null;
  setActiveOrgId: (id: string) => void;
  organization: Organization | null;
  role: AppRole | null;
  isLoading: boolean;
};

const OrgContext = createContext<OrgContextValue | null>(null);

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const { data: memberships = [], isLoading } = useMemberships();
  const [activeOrgId, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (memberships.length === 0) return;
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    const valid = memberships.find((m) => m.organization_id === stored);
    setActive((current) => {
      if (current && memberships.some((m) => m.organization_id === current)) return current;
      return valid?.organization_id ?? memberships[0]!.organization_id;
    });
  }, [memberships]);

  const value = useMemo<OrgContextValue>(() => {
    const membership = memberships.find((m) => m.organization_id === activeOrgId) ?? null;
    return {
      memberships,
      activeOrgId,
      setActiveOrgId: (id: string) => {
        setActive(id);
        if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, id);
      },
      organization: membership?.organizations ?? null,
      role: membership?.role ?? null,
      isLoading,
    };
  }, [memberships, activeOrgId, isLoading]);

  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
}

export function useOrganization() {
  const ctx = useContext(OrgContext);
  if (!ctx) throw new Error("useOrganization must be used inside OrganizationProvider");
  return ctx;
}

export const ROLE_LABELS: Record<AppRole, string> = {
  super_admin: "Platform admin",
  org_owner: "Owner",
  network_admin: "Network admin",
  billing_staff: "Billing staff",
  agent: "Agent / reseller",
  customer: "Customer",
};
