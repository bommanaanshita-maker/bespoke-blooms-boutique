import { createFileRoute, Outlet, redirect, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Bell,
  LogOut,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) throw redirect({ to: "/auth", search: { redirect: location.href } });
    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", u.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!role) throw redirect({ to: "/dashboard" });
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { user, signOut } = useAuth();
  const nav = useNavigate();

  const counts = useQuery({
    queryKey: ["admin-sidebar-counts"],
    queryFn: async () => {
      const [pending, total] = await Promise.all([
        supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("orders").select("id", { count: "exact", head: true }),
      ]);
      return { pending: pending.count ?? 0, total: total.count ?? 0 };
    },
  });

  const items = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { to: "/admin/orders", icon: Package, label: "Orders", badge: counts.data?.pending },
    { to: "/admin/customers", icon: Users, label: "Customers" },
    { to: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  ];

  return (
    <div className="min-h-screen bg-cream/40">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-blush-gradient text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="font-display text-base">gifted.</span>
          </Link>
          <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
            <Bell className="h-4 w-4" />
          </button>
        </header>

        <aside className="sticky top-0 hidden h-screen flex-col border-r border-border/60 bg-card p-5 lg:flex">
          <Link to="/" className="mb-8 flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-blush-gradient text-primary-foreground shadow-soft">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="font-display text-xl leading-none">gifted.</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Admin</p>
            </div>
          </Link>

          <nav className="flex-1 space-y-1">
            {items.map((m) => (
              <Link
                key={m.to}
                to={m.to}
                activeProps={{ className: "bg-primary/10 text-primary font-medium" }}
                activeOptions={{ exact: m.exact }}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-foreground/70 transition-soft hover:bg-muted"
              >
                <span className="flex items-center gap-3">
                  <m.icon className="h-4 w-4" />
                  {m.label}
                </span>
                {m.badge ? (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                    {m.badge}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="mt-6 rounded-2xl bg-muted/60 p-4">
            <p className="text-xs text-muted-foreground">Signed in as</p>
            <p className="truncate text-sm font-medium">{user?.email}</p>
            <button
              onClick={async () => {
                await signOut();
                nav({ to: "/" });
              }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-destructive hover:underline"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-30 hidden h-16 items-center justify-between border-b border-border/60 bg-background/80 px-5 backdrop-blur-xl lg:flex lg:px-8">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin Console</span>
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="rounded-full border border-border px-4 py-2 text-xs font-medium hover:bg-muted"
              >
                View storefront
              </Link>
              <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
                <Bell className="h-4 w-4" />
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-5 lg:px-8 lg:py-8">
            <Outlet />
          </main>

          <nav className="sticky bottom-0 z-40 grid grid-cols-4 gap-1 border-t border-border/60 bg-background px-2 py-2 sm:grid-cols-4 lg:hidden">
            {items.map((m) => (
              <Link
                key={m.to}
                to={m.to}
                activeProps={{ className: "text-primary bg-muted/50" }}
                activeOptions={{ exact: m.exact }}
                className="flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[10px] font-medium text-muted-foreground transition-soft hover:bg-muted"
              >
                <m.icon className="h-5 w-5" />
                <span className="line-clamp-1">{m.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
