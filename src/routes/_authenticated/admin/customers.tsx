import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/customers")({
  head: () => ({ meta: [{ title: "Customers — Admin" }] }),
  component: AdminCustomers,
});

function AdminCustomers() {
  const [q, setQ] = useState("");

  const data = useQuery({
    queryKey: ["admin-customers"],
    queryFn: async () => {
      const [profiles, orders] = await Promise.all([
        supabase.from("profiles").select("id, full_name, phone, created_at"),
        supabase.from("orders").select("user_id, total, status, created_at"),
      ]);
      return { profiles: profiles.data ?? [], orders: orders.data ?? [] };
    },
  });

  const rows = useMemo(() => {
    const orderMap = new Map<string, { count: number; spend: number; last: string | null }>();
    (data.data?.orders ?? []).forEach((o) => {
      const cur = orderMap.get(o.user_id) || { count: 0, spend: 0, last: null };
      cur.count += 1;
      if (o.status !== "cancelled") cur.spend += Number(o.total || 0);
      if (!cur.last || new Date(o.created_at) > new Date(cur.last)) cur.last = o.created_at;
      orderMap.set(o.user_id, cur);
    });
    return (data.data?.profiles ?? [])
      .map((p) => ({
        ...p,
        orders: orderMap.get(p.id)?.count ?? 0,
        spend: orderMap.get(p.id)?.spend ?? 0,
        last: orderMap.get(p.id)?.last ?? null,
      }))
      .filter((r) => !q || `${r.full_name} ${r.phone}`.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => b.spend - a.spend);
  }, [data.data, q]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Audience</p>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl">Customers</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or phone…"
          className="h-10 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm focus:outline-none focus:border-primary sm:h-11"
        />
      </div>

      <div className="overflow-hidden rounded-2xl bg-card shadow-soft sm:rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-left text-xs sm:text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium sm:px-5 sm:py-3">Customer</th>
                <th className="hidden px-3 py-2 font-medium sm:table-cell sm:px-5 sm:py-3">Phone</th>
                <th className="px-3 py-2 font-medium sm:px-5 sm:py-3">Orders</th>
                <th className="px-3 py-2 font-medium sm:px-5 sm:py-3">Spend</th>
                <th className="hidden px-3 py-2 font-medium md:table-cell md:px-5 md:py-3">Last order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-12 text-center sm:px-5 sm:py-16">
                    <Users className="mx-auto h-6 w-6 text-muted-foreground" />
                    <p className="mt-2 text-xs text-muted-foreground sm:text-sm">No customers yet.</p>
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/30">
                    <td className="px-3 py-2 font-medium sm:px-5 sm:py-3">{r.full_name || "—"}</td>
                    <td className="hidden px-3 py-2 text-muted-foreground sm:table-cell sm:px-5 sm:py-3">{r.phone || "—"}</td>
                    <td className="px-3 py-2 sm:px-5 sm:py-3">{r.orders}</td>
                    <td className="px-3 py-2 font-medium sm:px-5 sm:py-3">
                      ₹{r.spend.toLocaleString("en-IN")}
                    </td>
                    <td className="hidden px-3 py-2 text-muted-foreground md:table-cell md:px-5 md:py-3">
                      {r.last
                        ? new Date(r.last).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
