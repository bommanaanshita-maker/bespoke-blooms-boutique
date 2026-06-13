import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { N as Navbar } from "./Navbar-FQbSlWmj.mjs";
import { F as Footer } from "./Footer-DuM0UnWI.mjs";
import { supabase } from "./client-pPoEERrW.mjs";
import { P as Package } from "../_libs/lucide-react.mjs";
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
const statusHue = {
  placed: "bg-blush/40 text-foreground",
  confirmed: "bg-lavender/40",
  preparing: "bg-lavender/40",
  customized: "bg-lavender/40",
  packed: "bg-cream",
  shipped: "bg-gold/30",
  out_for_delivery: "bg-gold/40",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-muted text-muted-foreground"
};
function Orders() {
  const q = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("orders").select("id, order_number, status, total, payment_method, created_at, delivery_date, order_items(id, name, image, qty)").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-5 py-12 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl leading-tight sm:text-5xl", children: "My orders" }),
      q.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-10 text-sm text-muted-foreground", children: "Loading…" }) : (q.data ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 rounded-3xl border border-dashed border-border bg-card p-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto grid h-14 w-14 place-items-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 font-display text-2xl", children: "No orders yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-4 inline-block text-sm text-primary underline", children: "Start shopping" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 space-y-4", children: q.data.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-3xl bg-card p-5 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders/$id", params: {
              id: o.id
            }, className: "font-display text-lg hover:underline", children: o.order_number }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Placed ",
              new Date(o.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              }),
              o.delivery_date && ` · Delivery ${new Date(o.delivery_date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short"
              })}`
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-3 py-1 text-[11px] font-medium capitalize ${statusHue[o.status] ?? "bg-muted"}`, children: o.status.replace("_", " ") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl", children: [
              "₹",
              Number(o.total).toLocaleString("en-IN")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-3", children: (o.order_items ?? []).slice(0, 4).map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-full bg-muted/60 py-1 pl-1 pr-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.image, alt: "", className: "h-7 w-7 rounded-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate max-w-[160px]", children: [
            it.name,
            " × ",
            it.qty
          ] })
        ] }, it.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-end gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders/$id", params: {
          id: o.id
        }, className: "rounded-full border border-border bg-background px-4 py-2 text-xs font-medium transition-soft hover:bg-muted", children: "View details" }) })
      ] }, o.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Orders as component
};
