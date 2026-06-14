import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  IndianRupee,
  TrendingUp,
  Users,
  Gift,
  Cake,
  Heart,
  Sparkles,
  Plus,
  ListChecks,
  Truck,
  BarChart3,
  Bell,
  AlertTriangle,
  CalendarHeart,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { products } from "@/lib/products";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — gifted." }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const summary = useQuery({
    queryKey: ["admin-summary"],
    queryFn: async () => {
      const [orders, items, customers] = await Promise.all([
        supabase.from("orders").select("id, user_id, status, total, created_at, ship_name, order_number"),
        supabase.from("order_items").select("product_id, name, qty, price"),
        supabase.from("profiles").select("id, full_name"),
      ]);
      return {
        orders: orders.data ?? [],
        items: items.data ?? [],
        customers: customers.data ?? [],
      };
    },
  });

  const stats = useMemo(() => {
    const o = summary.data?.orders ?? [];
    const total = o.length;
    const pending = o.filter((x) => ["pending", "confirmed", "processing"].includes(x.status)).length;
    const delivered = o.filter((x) => x.status === "delivered").length;
    const cancelled = o.filter((x) => x.status === "cancelled").length;
    const revenue = o
      .filter((x) => x.status !== "cancelled")
      .reduce((n, x) => n + Number(x.total || 0), 0);
    return { total, pending, delivered, cancelled, revenue };
  }, [summary.data]);

  const cards = [
    { label: "Total Orders", value: stats.total, Icon: Package, hue: "bg-blush/40 text-foreground" },
    { label: "Pending", value: stats.pending, Icon: Clock, hue: "bg-amber-100 text-amber-900" },
    { label: "Delivered", value: stats.delivered, Icon: CheckCircle2, hue: "bg-emerald-100 text-emerald-900" },
    { label: "Cancelled", value: stats.cancelled, Icon: XCircle, hue: "bg-rose-100 text-rose-900" },
    {
      label: "Revenue",
      value: `₹${stats.revenue.toLocaleString("en-IN")}`,
      Icon: IndianRupee,
      hue: "bg-lavender/40 text-foreground",
    },
  ];

  // Monthly chart
  const monthly = useMemo(() => {
    const months: { key: string; label: string; orders: number; revenue: number }[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: d.toLocaleString("en-US", { month: "short" }),
        orders: 0,
        revenue: 0,
      });
    }
    (summary.data?.orders ?? []).forEach((o) => {
      const d = new Date(o.created_at);
      const k = `${d.getFullYear()}-${d.getMonth()}`;
      const m = months.find((x) => x.key === k);
      if (m && o.status !== "cancelled") {
        m.orders += 1;
        m.revenue += Number(o.total || 0);
      }
    });
    return months;
  }, [summary.data]);

  const maxRev = Math.max(1, ...monthly.map((m) => m.revenue));
  const maxOrd = Math.max(1, ...monthly.map((m) => m.orders));

  // Popular products
  const popular = useMemo(() => {
    const counts = new Map<string, { name: string; qty: number; revenue: number }>();
    (summary.data?.items ?? []).forEach((it) => {
      const k = it.product_id || it.name;
      const c = counts.get(k) || { name: it.name, qty: 0, revenue: 0 };
      c.qty += Number(it.qty || 0);
      c.revenue += Number(it.qty || 0) * Number(it.price || 0);
      counts.set(k, c);
    });
    return [...counts.values()].sort((a, b) => b.qty - a.qty).slice(0, 5);
  }, [summary.data]);

  // Category-wise sales (from static catalog matched on name)
  const categoryShare = useMemo(() => {
    const totals = new Map<string, number>();
    (summary.data?.items ?? []).forEach((it) => {
      const p = products.find((pp) => pp.id === it.product_id || pp.name === it.name);
      if (!p) return;
      totals.set(p.category, (totals.get(p.category) || 0) + Number(it.qty || 0));
    });
    const arr = [...totals.entries()].map(([k, v]) => ({ category: k, qty: v }));
    arr.sort((a, b) => b.qty - a.qty);
    const total = arr.reduce((n, x) => n + x.qty, 0) || 1;
    return arr.slice(0, 5).map((x) => ({ ...x, pct: Math.round((x.qty / total) * 100) }));
  }, [summary.data]);

  const recent = (summary.data?.orders ?? [])
    .slice()
    .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
    .slice(0, 6);

  // Mock notifications & reminders (calendar-driven, no extra schema)
  const reminders = useMemo(() => {
    const now = new Date();
    const upcoming = [
      { label: "Diwali", icon: Sparkles, date: new Date(now.getFullYear(), 10, 1), tint: "bg-amber-100" },
      { label: "Christmas", icon: Gift, date: new Date(now.getFullYear(), 11, 25), tint: "bg-emerald-100" },
      { label: "Valentine's Day", icon: Heart, date: new Date(now.getFullYear() + (now.getMonth() > 1 ? 1 : 0), 1, 14), tint: "bg-rose-100" },
      { label: "Mother's Day", icon: CalendarHeart, date: new Date(now.getFullYear() + (now.getMonth() > 4 ? 1 : 0), 4, 12), tint: "bg-blush/60" },
    ];
    return upcoming
      .map((u) => ({
        ...u,
        daysAway: Math.max(0, Math.ceil((+u.date - +now) / 86400000)),
      }))
      .sort((a, b) => a.daysAway - b.daysAway)
      .slice(0, 3);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Overview</p>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time snapshot of orders, customers, and revenue.
          </p>
        </div>
        <Link
          to="/admin/orders"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground shadow-card hover:opacity-95"
        >
          <ListChecks className="h-3.5 w-3.5" /> Manage orders
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl bg-card p-4 shadow-soft sm:rounded-3xl sm:p-5"
          >
            <span className={`grid h-10 w-10 place-items-center rounded-full ${c.hue}`}>
              <c.Icon className="h-4 w-4" />
            </span>
            <p className="mt-3 text-xs text-muted-foreground">{c.label}</p>
            <p className="font-display text-xl sm:text-2xl lg:text-3xl">{c.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-card p-4 shadow-soft sm:rounded-3xl sm:p-6 lg:col-span-2">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-lg sm:text-xl">Revenue & Orders</h2>
              <p className="text-xs text-muted-foreground">Last 6 months</p>
            </div>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 flex h-40 items-end gap-2 sm:h-56 sm:gap-3">
            {monthly.map((m) => (
              <div key={m.key} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-full w-full items-end justify-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.revenue / maxRev) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-3 rounded-t-md bg-blush-gradient"
                    title={`₹${m.revenue.toLocaleString("en-IN")}`}
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.orders / maxOrd) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="w-3 rounded-t-md bg-lavender/80"
                    title={`${m.orders} orders`}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">{m.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" /> Revenue
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-lavender" /> Orders
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-card p-4 shadow-soft sm:rounded-3xl sm:p-6">
          <h2 className="font-display text-lg sm:text-xl">Category Sales</h2>
          <p className="text-xs text-muted-foreground">Top performing categories</p>
          <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
            {categoryShare.length === 0 ? (
              <li className="rounded-2xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                No category data yet
              </li>
            ) : (
              categoryShare.map((c) => (
                <li key={c.category}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="capitalize">{c.category}</span>
                    <span className="text-xs text-muted-foreground">{c.qty} · {c.pct}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${c.pct}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="h-full rounded-full bg-blush-gradient"
                    />
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Recent orders + Notifications */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-card p-4 shadow-soft sm:rounded-3xl sm:p-6 lg:col-span-2">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <h2 className="font-display text-lg sm:text-xl">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 -mx-2 overflow-x-auto sm:-mx-4 lg:-mx-0">
            <table className="w-full min-w-[500px] text-left text-xs sm:text-sm">
              <thead className="uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-2 py-2 font-medium sm:px-4">Order</th>
                  <th className="px-2 py-2 font-medium sm:px-4">Customer</th>
                  <th className="px-2 py-2 font-medium sm:px-4">Amount</th>
                  <th className="px-2 py-2 font-medium sm:px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {recent.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-2 py-12 text-center text-muted-foreground sm:px-4">
                      No orders yet.
                    </td>
                  </tr>
                ) : (
                  recent.map((o) => (
                    <tr key={o.id} className="hover:bg-muted/40">
                      <td className="px-2 py-2 font-medium sm:px-4 sm:py-3">{o.order_number}</td>
                      <td className="px-2 py-2 text-muted-foreground sm:px-4 sm:py-3 line-clamp-1">{o.ship_name}</td>
                      <td className="px-2 py-2 sm:px-4 sm:py-3">₹{Number(o.total).toLocaleString("en-IN")}</td>
                      <td className="px-2 py-2 sm:px-4 sm:py-3">
                        <StatusPill status={o.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="rounded-2xl bg-card p-4 shadow-soft sm:rounded-3xl sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base sm:text-lg">Notifications</h2>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </div>
            <ul className="mt-3 space-y-2 text-xs sm:mt-4 sm:space-y-3 sm:text-sm">
              <Notification
                Icon={Package}
                tint="bg-blush/40"
                title={`${stats.pending} order${stats.pending === 1 ? "" : "s"} need attention`}
                body="Awaiting confirmation or processing."
              />
              <Notification
                Icon={Truck}
                tint="bg-lavender/40"
                title="Deliveries due today"
                body={`${recent.filter((o) => o.status === "shipped").length} shipment(s) on the way.`}
              />
              <Notification
                Icon={AlertTriangle}
                tint="bg-amber-100"
                title="Low inventory alert"
                body="3 SKUs are running below 10 units."
              />
            </ul>
          </div>

          <div className="rounded-2xl bg-card p-4 shadow-soft sm:rounded-3xl sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base sm:text-lg">Occasion Reminders</h2>
              <Cake className="h-4 w-4 text-muted-foreground" />
            </div>
            <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
              {reminders.map((r) => (
                <li key={r.label} className="flex items-center gap-2 sm:gap-3">
                  <span className={`grid h-8 w-8 flex-none place-items-center rounded-full text-sm sm:h-9 sm:w-9 ${r.tint}`}>
                    <r.icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium sm:text-sm">{r.label}</p>
                    <p className="text-[10px] text-muted-foreground sm:text-xs">
                      {r.daysAway === 0 ? "Today" : `In ${r.daysAway} days`}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Popular gifts + Customer analytics + Quick actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-card p-6 shadow-soft">
          <h2 className="font-display text-xl">Popular Gifts</h2>
          <p className="text-xs text-muted-foreground">Best-selling products</p>
          <ul className="mt-5 space-y-3">
            {popular.length === 0 ? (
              <li className="text-sm text-muted-foreground">No sales yet.</li>
            ) : (
              popular.map((p, i) => (
                <li key={p.name} className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-xs font-semibold">
                      {i + 1}
                    </span>
                    <span className="truncate text-sm">{p.name}</span>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{p.qty} sold</span>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="rounded-3xl bg-card p-6 shadow-soft">
          <h2 className="font-display text-xl">Customer Analytics</h2>
          <p className="text-xs text-muted-foreground">Audience snapshot</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: "Total", value: summary.data?.customers.length ?? 0, Icon: Users },
              {
                label: "Repeat",
                value: repeatCustomers(summary.data?.orders ?? []),
                Icon: TrendingUp,
              },
              {
                label: "Corporate",
                value: corporateCustomers(summary.data?.customers ?? []),
                Icon: Gift,
              },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-muted/50 p-4 text-center">
                <s.Icon className="mx-auto h-4 w-4 text-muted-foreground" />
                <p className="mt-2 font-display text-2xl">{s.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-card p-6 shadow-soft">
          <h2 className="font-display text-xl">Quick Actions</h2>
          <p className="text-xs text-muted-foreground">Jump back in</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              { to: "/admin/orders", icon: ListChecks, label: "Manage Orders" },
              { to: "/admin/orders", icon: Truck, label: "Track Deliveries" },
              { to: "/admin/analytics", icon: BarChart3, label: "View Reports" },
              { to: "/shop", icon: Plus, label: "View Catalog" },
            ].map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="flex flex-col items-start gap-2 rounded-2xl bg-muted/50 p-4 text-sm transition-soft hover:bg-muted"
              >
                <a.icon className="h-4 w-4 text-primary" />
                <span className="font-medium">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-900",
    confirmed: "bg-sky-100 text-sky-900",
    processing: "bg-indigo-100 text-indigo-900",
    packed: "bg-violet-100 text-violet-900",
    shipped: "bg-blue-100 text-blue-900",
    out_for_delivery: "bg-purple-100 text-purple-900",
    delivered: "bg-emerald-100 text-emerald-900",
    cancelled: "bg-rose-100 text-rose-900",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs capitalize ${
        colors[status] || "bg-muted text-foreground"
      }`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}

function Notification({
  Icon,
  tint,
  title,
  body,
}: {
  Icon: typeof Bell;
  tint: string;
  title: string;
  body: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${tint}`}>
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}

function repeatCustomers(orders: { user_id: string }[]) {
  const counts = new Map<string, number>();
  orders.forEach((o) => counts.set(o.user_id, (counts.get(o.user_id) || 0) + 1));
  return [...counts.values()].filter((n) => n > 1).length;
}
function corporateCustomers(customers: { full_name: string | null }[]) {
  return customers.filter((c) =>
    /pvt|ltd|inc|corp|llp|company|co\.?$/i.test(c.full_name || ""),
  ).length;
}
