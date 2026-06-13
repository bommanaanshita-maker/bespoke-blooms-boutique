import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, N as Navbar } from "./Navbar-FQbSlWmj.mjs";
import { F as Footer } from "./Footer-DuM0UnWI.mjs";
import { supabase } from "./client-pPoEERrW.mjs";
import { P as Package, i as Truck, C as CircleCheck, H as Heart, U as User, M as MapPin } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/zustand.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function Dashboard() {
  const {
    user
  } = useAuth();
  const summary = useQuery({
    queryKey: ["dashboard-summary", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const [orders, wishlist, recent] = await Promise.all([supabase.from("orders").select("id, status"), supabase.from("wishlist").select("id"), supabase.from("orders").select("id, order_number, status, total, created_at").order("created_at", {
        ascending: false
      }).limit(5)]);
      const all = orders.data ?? [];
      return {
        total: all.length,
        active: all.filter((o) => o.status !== "delivered" && o.status !== "cancelled").length,
        delivered: all.filter((o) => o.status === "delivered").length,
        wishlist: (wishlist.data ?? []).length,
        recent: recent.data ?? []
      };
    }
  });
  const stats = [{
    label: "Total orders",
    value: summary.data?.total ?? 0,
    Icon: Package,
    hue: "bg-blush/40"
  }, {
    label: "Active orders",
    value: summary.data?.active ?? 0,
    Icon: Truck,
    hue: "bg-lavender/40"
  }, {
    label: "Delivered",
    value: summary.data?.delivered ?? 0,
    Icon: CircleCheck,
    hue: "bg-cream"
  }, {
    label: "Wishlist",
    value: summary.data?.wishlist ?? 0,
    Icon: Heart,
    hue: "bg-blush/40"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-5 py-12 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-2 font-display text-4xl leading-tight sm:text-5xl", children: [
        "Hi ",
        user?.user_metadata?.full_name?.split(" ")[0] || "there",
        ","
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Here's a snapshot of your gifting." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card p-5 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-10 w-10 place-items-center rounded-full ${s.hue}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.Icon, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-muted-foreground", children: s.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl", children: s.value })
      ] }, s.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-6 lg:grid-cols-[1fr_320px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Recent orders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", className: "text-xs text-primary hover:underline", children: "View all" })
          ] }),
          (summary.data?.recent ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-dashed border-border p-10 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No orders yet." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-3 inline-block text-sm text-primary underline", children: "Start shopping" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 divide-y divide-border/60", children: summary.data.recent.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders/$id", params: {
                id: o.id
              }, className: "font-medium hover:underline", children: o.order_number }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs capitalize text-muted-foreground", children: o.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-lg", children: [
              "₹",
              Number(o.total).toLocaleString("en-IN")
            ] })
          ] }, o.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-3", children: [{
          to: "/profile",
          icon: User,
          label: "Edit profile"
        }, {
          to: "/addresses",
          icon: MapPin,
          label: "Manage addresses"
        }, {
          to: "/wishlist",
          icon: Heart,
          label: "View wishlist"
        }].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: m.to, className: "flex items-center justify-between rounded-2xl bg-card px-5 py-4 shadow-soft transition-soft hover:shadow-lift", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(m.icon, { className: "h-4 w-4 text-muted-foreground" }),
            m.label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "→" })
        ] }, m.to)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Dashboard as component
};
