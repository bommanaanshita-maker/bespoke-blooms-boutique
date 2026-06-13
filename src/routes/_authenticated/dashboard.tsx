import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Package, Truck, CheckCircle2, Heart, MapPin, User as UserIcon } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — gifted." }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  const summary = useQuery({
    queryKey: ["dashboard-summary", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const [orders, wishlist, recent] = await Promise.all([
        supabase.from("orders").select("id, status"),
        supabase.from("wishlist").select("id"),
        supabase
          .from("orders")
          .select("id, order_number, status, total, created_at")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);
      const all = orders.data ?? [];
      return {
        total: all.length,
        active: all.filter((o) => o.status !== "delivered" && o.status !== "cancelled").length,
        delivered: all.filter((o) => o.status === "delivered").length,
        wishlist: (wishlist.data ?? []).length,
        recent: recent.data ?? [],
      };
    },
  });

  const stats = [
    { label: "Total orders", value: summary.data?.total ?? 0, Icon: Package, hue: "bg-blush/40" },
    { label: "Active orders", value: summary.data?.active ?? 0, Icon: Truck, hue: "bg-lavender/40" },
    { label: "Delivered", value: summary.data?.delivered ?? 0, Icon: CheckCircle2, hue: "bg-cream" },
    { label: "Wishlist", value: summary.data?.wishlist ?? 0, Icon: Heart, hue: "bg-blush/40" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Account</p>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
          Hi {user?.user_metadata?.full_name?.split(" ")[0] || "there"},
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Here's a snapshot of your gifting.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl bg-card p-5 shadow-soft">
              <span className={`grid h-10 w-10 place-items-center rounded-full ${s.hue}`}>
                <s.Icon className="h-4 w-4" />
              </span>
              <p className="mt-4 text-xs text-muted-foreground">{s.label}</p>
              <p className="font-display text-3xl">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Recent orders</h2>
              <Link to="/orders" className="text-xs text-primary hover:underline">View all</Link>
            </div>
            {(summary.data?.recent ?? []).length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center">
                <p className="text-sm text-muted-foreground">No orders yet.</p>
                <Link to="/shop" className="mt-3 inline-block text-sm text-primary underline">
                  Start shopping
                </Link>
              </div>
            ) : (
              <ul className="mt-4 divide-y divide-border/60">
                {summary.data!.recent.map((o) => (
                  <li key={o.id} className="flex items-center justify-between py-3">
                    <div>
                      <Link to="/orders/$id" params={{ id: o.id }} className="font-medium hover:underline">
                        {o.order_number}
                      </Link>
                      <p className="text-xs capitalize text-muted-foreground">{o.status}</p>
                    </div>
                    <p className="font-display text-lg">₹{Number(o.total).toLocaleString("en-IN")}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="space-y-3">
            {[
              { to: "/profile", icon: UserIcon, label: "Edit profile" },
              { to: "/addresses", icon: MapPin, label: "Manage addresses" },
              { to: "/wishlist", icon: Heart, label: "View wishlist" },
            ].map((m) => (
              <Link
                key={m.to}
                to={m.to}
                className="flex items-center justify-between rounded-2xl bg-card px-5 py-4 shadow-soft transition-soft hover:shadow-lift"
              >
                <span className="flex items-center gap-3 text-sm">
                  <m.icon className="h-4 w-4 text-muted-foreground" />
                  {m.label}
                </span>
                <span className="text-muted-foreground">→</span>
              </Link>
            ))}
          </aside>
        </div>
      </section>
      <Footer />
    </div>
  );
}
