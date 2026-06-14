import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { IndianRupee, ShoppingBag, TrendingUp, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { products } from "@/lib/products";

export const Route = createFileRoute("/_authenticated/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Admin" }] }),
  component: AdminAnalytics,
});

function AdminAnalytics() {
  const data = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const [orders, items] = await Promise.all([
        supabase.from("orders").select("status, total, created_at"),
        supabase.from("order_items").select("product_id, name, qty, price"),
      ]);
      return { orders: orders.data ?? [], items: items.data ?? [] };
    },
  });

  const stats = useMemo(() => {
    const o = data.data?.orders ?? [];
    const active = o.filter((x) => x.status !== "cancelled");
    const revenue = active.reduce((n, x) => n + Number(x.total || 0), 0);
    const aov = active.length ? Math.round(revenue / active.length) : 0;
    return { revenue, orders: active.length, aov };
  }, [data.data]);

  const monthly = useMemo(() => {
    const months: { key: string; label: string; revenue: number; orders: number }[] = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: d.toLocaleString("en-US", { month: "short" }),
        revenue: 0,
        orders: 0,
      });
    }
    (data.data?.orders ?? []).forEach((o) => {
      if (o.status === "cancelled") return;
      const d = new Date(o.created_at);
      const k = `${d.getFullYear()}-${d.getMonth()}`;
      const m = months.find((x) => x.key === k);
      if (m) {
        m.revenue += Number(o.total || 0);
        m.orders += 1;
      }
    });
    return months;
  }, [data.data]);

  const maxRev = Math.max(1, ...monthly.map((m) => m.revenue));

  const categoryData = useMemo(() => {
    const totals = new Map<string, { qty: number; revenue: number }>();
    (data.data?.items ?? []).forEach((it) => {
      const p = products.find((pp) => pp.id === it.product_id || pp.name === it.name);
      if (!p) return;
      const c = totals.get(p.category) || { qty: 0, revenue: 0 };
      c.qty += Number(it.qty || 0);
      c.revenue += Number(it.qty || 0) * Number(it.price || 0);
      totals.set(p.category, c);
    });
    return [...totals.entries()]
      .map(([cat, v]) => ({ cat, ...v }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [data.data]);

  const maxCatRev = Math.max(1, ...categoryData.map((c) => c.revenue));

  const cards = [
    {
      label: "Total Revenue",
      value: `₹${stats.revenue.toLocaleString("en-IN")}`,
      Icon: IndianRupee,
    },
    { label: "Total Orders", value: stats.orders, Icon: ShoppingBag },
    { label: "Avg. Order Value", value: `₹${stats.aov.toLocaleString("en-IN")}`, Icon: TrendingUp },
  ];

  return (
    <div className="space-y-4 sm:space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Reports</p>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl">Analytics</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl bg-card p-4 shadow-soft sm:rounded-3xl sm:p-6"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-blush/40">
              <c.Icon className="h-4 w-4" />
            </span>
            <p className="mt-4 text-xs text-muted-foreground">{c.label}</p>
            <p className="font-display text-xl sm:text-3xl">{c.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl bg-card p-4 shadow-soft sm:rounded-3xl sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg sm:text-xl">Revenue & Orders</h2>
            <p className="text-xs text-muted-foreground">Last 6 months</p>
          </div>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="mt-6 flex h-40 items-end gap-1 sm:h-64 sm:gap-2">
          {monthly.slice(-6).map((m) => (
            <div key={m.key} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full items-end gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(m.revenue / maxRev) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex-1 rounded-t-md bg-blush"
                  title={`Revenue: ₹${m.revenue.toLocaleString("en-IN")}`}
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(m.orders / Math.max(1, ...monthly.map((x) => x.orders))) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex-1 rounded-t-md bg-lavender"
                  title={`Orders: ${m.orders}`}
                />
              </div>
              <span className="text-[8px] text-muted-foreground sm:text-[10px]">{m.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-blush" />
            <span className="text-xs text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-lavender" />
            <span className="text-xs text-muted-foreground">Orders</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-card p-4 shadow-soft sm:rounded-3xl sm:p-6">
        <h2 className="font-display text-lg sm:text-xl">Category-wise Sales</h2>
        <p className="text-xs text-muted-foreground">Revenue contribution</p>
        <ul className="mt-5 space-y-3 sm:space-y-4">
          {categoryData.length === 0 ? (
            <li className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No category sales yet.
            </li>
          ) : (
            categoryData.map((c) => (
              <li key={c.cat}>
                <div className="flex items-center justify-between text-sm">
                  <span className="capitalize">{c.cat}</span>
                  <span className="text-xs text-muted-foreground">
                    {c.qty} units · ₹{c.revenue.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(c.revenue / maxCatRev) * 100}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-full rounded-full bg-blush-gradient"
                  />
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
