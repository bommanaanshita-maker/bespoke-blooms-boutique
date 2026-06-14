import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/orders")({
  head: () => ({ meta: [{ title: "Orders — Admin" }] }),
  component: AdminOrders,
});

const STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "packed",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

function AdminOrders() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const qc = useQueryClient();

  const orders = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, order_number, status, total, ship_name, ship_email, created_at, payment_method")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      qc.invalidateQueries({ queryKey: ["admin-summary"] });
      qc.invalidateQueries({ queryKey: ["admin-sidebar-counts"] });
      toast.success("Order updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = (orders.data ?? []).filter((o) => {
    if (status !== "all" && o.status !== status) return false;
    if (q && !`${o.order_number} ${o.ship_name} ${o.ship_email}`.toLowerCase().includes(q.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Fulfilment</p>
        <h1 className="mt-1 font-display text-3xl">All Orders</h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search order #, customer, email…"
            className="h-11 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 rounded-full border border-border bg-card pl-11 pr-8 text-sm focus:outline-none focus:border-primary"
          >
            <option value="all">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl bg-card shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Payment</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {orders.isLoading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">
                    Loading…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">
                    No matching orders.
                  </td>
                </tr>
              ) : (
                filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-muted/30">
                    <td className="px-5 py-3 font-medium">
                      <Link to="/orders/$id" params={{ id: o.id }} className="hover:underline">
                        {o.order_number}
                      </Link>
                    </td>
                    <td className="px-5 py-3">
                      <p>{o.ship_name}</p>
                      <p className="text-xs text-muted-foreground">{o.ship_email}</p>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {new Date(o.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3 capitalize text-muted-foreground">{o.payment_method}</td>
                    <td className="px-5 py-3 font-medium">₹{Number(o.total).toLocaleString("en-IN")}</td>
                    <td className="px-5 py-3">
                      <select
                        value={o.status}
                        onChange={(e) => update.mutate({ id: o.id, status: e.target.value })}
                        className="rounded-full border border-border bg-background px-3 py-1 text-xs capitalize focus:outline-none focus:border-primary"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s.replace(/_/g, " ")}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        to="/orders/$id"
                        params={{ id: o.id }}
                        className="text-xs text-primary hover:underline"
                      >
                        View
                      </Link>
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
