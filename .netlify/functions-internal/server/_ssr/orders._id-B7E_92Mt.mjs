import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { Q as notFound } from "../_libs/tanstack__router-core.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { b as useCart, N as Navbar } from "./Navbar-FQbSlWmj.mjs";
import { F as Footer } from "./Footer-DuM0UnWI.mjs";
import { supabase } from "./client-pPoEERrW.mjs";
import { b as Route } from "./router-DxlzPpTF.mjs";
import { f as LoaderCircle, R as RotateCw, p as Check, u as Circle } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
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
import "../_libs/zod.mjs";
const STAGES = [{
  key: "placed",
  label: "Order Placed"
}, {
  key: "confirmed",
  label: "Confirmed"
}, {
  key: "preparing",
  label: "Preparing"
}, {
  key: "customized",
  label: "Customized"
}, {
  key: "packed",
  label: "Packed"
}, {
  key: "shipped",
  label: "Shipped"
}, {
  key: "out_for_delivery",
  label: "Out for Delivery"
}, {
  key: "delivered",
  label: "Delivered"
}];
function OrderDetail() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const add = useCart((s) => s.add);
  const [reordering, setReordering] = reactExports.useState(false);
  const q = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const {
        data: order,
        error
      } = await supabase.from("orders").select("*, order_items(*), order_status_history(status, note, created_at)").eq("id", id).maybeSingle();
      if (error) throw error;
      if (!order) throw notFound();
      return order;
    }
  });
  if (q.isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-3xl px-5 py-20 text-center text-sm text-muted-foreground", children: "Loading…" })
    ] });
  }
  if (!q.data) return null;
  const o = q.data;
  const currentIdx = Math.max(0, STAGES.findIndex((s) => s.key === o.status));
  const progress = (currentIdx + 1) / STAGES.length * 100;
  const reorder = async () => {
    setReordering(true);
    for (const it of o.order_items ?? []) {
      add({
        productId: it.product_id,
        name: it.name,
        price: Number(it.price),
        image: it.image,
        qty: it.qty,
        customization: it.customization ?? {}
      });
    }
    setReordering(false);
    toast.success("Items added to cart");
    navigate({
      to: "/cart"
    });
  };
  const itemsSubtotal = (o.order_items ?? []).reduce((s, i) => s + Number(i.price) * i.qty, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-5 py-12 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", className: "text-xs text-muted-foreground hover:text-foreground", children: "← Back to orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-4xl", children: o.order_number }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Placed ",
            new Date(o.created_at).toLocaleString("en-IN")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: reorder, disabled: reordering, className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-card hover:opacity-95 disabled:opacity-60", children: [
          reordering ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "h-4 w-4" }),
          "Order again"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-3xl bg-card p-6 shadow-soft sm:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Tracking" }),
          o.delivery_date && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Est. delivery ",
            new Date(o.delivery_date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-blush-gradient transition-all", style: {
          width: `${progress}%`
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-7 space-y-4", children: STAGES.map((s, i) => {
          const reached = i <= currentIdx;
          const histEntry = (o.order_status_history ?? []).find((h) => h.status === s.key);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mt-0.5 grid h-6 w-6 place-items-center rounded-full ${reached ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`, children: reached ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm ${reached ? "font-medium" : "text-muted-foreground"}`, children: s.label }),
              histEntry && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(histEntry.created_at).toLocaleString("en-IN") })
            ] })
          ] }, s.key);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-6 lg:grid-cols-[1fr_320px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card p-6 shadow-soft sm:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Items" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 divide-y divide-border/60", children: (o.order_items ?? []).map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-4 py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.image, alt: "", className: "h-20 w-20 flex-none rounded-2xl object-cover" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg", children: it.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Qty: ",
                  it.qty
                ] }),
                it.customization && Object.keys(it.customization).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-0.5 text-xs text-muted-foreground", children: Object.entries(it.customization).filter(([, v]) => v).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "capitalize", children: [
                    k,
                    ":"
                  ] }),
                  " ",
                  String(v)
                ] }, k)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-lg", children: [
                "₹",
                (Number(it.price) * it.qty).toLocaleString("en-IN")
              ] })
            ] }, it.id)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card p-6 shadow-soft sm:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Shipping address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm", children: [
              o.ship_name,
              " · ",
              o.ship_phone
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: o.ship_email }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm", children: [
              o.ship_line1,
              o.ship_line2 ? `, ${o.ship_line2}` : "",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              o.ship_city,
              ", ",
              o.ship_state,
              " ",
              o.ship_pincode
            ] }),
            o.gift_message && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl bg-blush/20 p-4 text-sm italic", children: [
              '"',
              o.gift_message,
              '"'
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "h-fit rounded-3xl bg-muted/50 p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-4 space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Row, { label: "Items", children: [
              "₹",
              itemsSubtotal.toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Row, { label: "Subtotal", children: [
              "₹",
              Number(o.subtotal).toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Shipping", children: Number(o.shipping) === 0 ? "Free" : `₹${o.shipping}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Payment", children: o.payment_method.toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-t border-border/60 pt-3 text-base", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-medium", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "font-display text-2xl", children: [
                "₹",
                Number(o.total).toLocaleString("en-IN")
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Row({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children })
  ] });
}
export {
  OrderDetail as component
};
