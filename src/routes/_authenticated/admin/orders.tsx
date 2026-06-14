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
    <div className="space-y-4 sm:space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Fulfilment</p>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl">All Orders</h1>
      </div>

      <div className="flex flex-col gap-2 sm:gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search order #, customer, email…"
            className="h-10 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm focus:outline-none focus:border-primary sm:h-11"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 w-full rounded-full border border-border bg-card pl-11 pr-8 text-sm focus:outline-none focus:border-primary sm:h-11 sm:w-auto"
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

      <div className="overflow-hidden rounded-2xl bg-card shadow-soft sm:rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-xs sm:text-sm">
            <thead className="bg-muted/40 uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium sm:px-5 sm:py-3">Order</th>
                <th className="hidden px-3 py-2 font-medium sm:table-cell sm:px-5 sm:py-3">Customer</th>
                <th className="px-3 py-2 font-medium sm:px-5 sm:py-3">Date</th>
                <th className="hidden px-3 py-2 font-medium md:table-cell md:px-5 md:py-3">Payment</th>
                <th className="px-3 py-2 font-medium sm:px-5 sm:py-3">Total</th>
                <th className="px-3 py-2 font-medium sm:px-5 sm:py-3">Status</th>

              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {orders.isLoading ? (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center text-muted-foreground sm:px-5 sm:py-12">
                    Loading…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center text-muted-foreground sm:px-5 sm:py-12">
                    No matching orders.
                  </td>
                </tr>
              ) : (
                filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-muted/30">
                    <td className="px-3 py-2 font-medium sm:px-5 sm:py-3">
                      <Link to="/orders/$id" params={{ id: o.id }} className="hover:underline">
                        {o.order_number}
                      </Link>
                    </td>
                    <td className="hidden px-3 py-2 sm:table-cell sm:px-5 sm:py-3">
                      <p className="text-sm">{o.ship_name}</p>
                      <p className="text-xs text-muted-foreground">{o.ship_email}</p>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground sm:px-5 sm:py-3">
                      {new Date(o.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="hidden capitalize text-muted-foreground px-3 py-2 md:table-cell md:px-5 md:py-3">{o.payment_method}</td>
                    <td className="px-3 py-2 font-medium sm:px-5 sm:py-3">₹{Number(o.total).toLocaleString("en-IN")}</td>
                    <td className="px-3 py-2 sm:px-5 sm:py-3">
                      <select
                        value={o.status}
                        onChange={(e) => update.mutate({ id: o.id, status: e.target.value })}
                        className="rounded-full border border-border bg-background px-2 py-1 text-xs capitalize focus:outline-none focus:border-primary sm:px-3"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s.replace(/_/g, " ")}
                          </option>
                        ))}
                      </select>
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
