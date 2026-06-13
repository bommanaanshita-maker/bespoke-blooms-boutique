import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useCart, c as cartTotal, N as Navbar } from "./Navbar-FQbSlWmj.mjs";
import { F as Footer } from "./Footer-DuM0UnWI.mjs";
import { c as ShoppingBag, l as Minus, m as Plus, o as Trash2 } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/zustand.mjs";
import "./client-pPoEERrW.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function CartPage() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const setQty = useCart((s) => s.setQty);
  const subtotal = cartTotal(items);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-5 py-12 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Cart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl leading-tight sm:text-5xl", children: "Your gift bag" }),
      items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 rounded-3xl border border-dashed border-border bg-card p-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto grid h-14 w-14 place-items-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5 text-foreground/70" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 font-display text-2xl", children: "Your cart is empty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Let's find something they'll love." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95", children: "Browse gifts" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-10 lg:grid-cols-[1fr_360px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.li, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: i * 0.04
        }, className: "grid grid-cols-[88px_minmax(0,1fr)_auto] gap-4 rounded-3xl bg-card p-4 shadow-soft sm:grid-cols-[112px_minmax(0,1fr)_auto] sm:gap-5 sm:p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: "", width: 112, height: 112, loading: "lazy", className: "aspect-square w-full rounded-2xl object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-display text-lg", children: item.name }),
            item.customization && Object.keys(item.customization).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-1 space-y-0.5 text-xs text-muted-foreground", children: Object.entries(item.customization).filter(([, v]) => v).slice(0, 3).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "truncate", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "capitalize", children: [
                k,
                ":"
              ] }),
              " ",
              v
            ] }, k)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 inline-flex items-center rounded-full border border-border bg-background", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(item.id, item.qty - 1), className: "grid h-9 w-9 place-items-center text-foreground/70 hover:text-foreground", "aria-label": "Decrease", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center text-sm font-medium", children: item.qty }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(item.id, item.qty + 1), className: "grid h-9 w-9 place-items-center text-foreground/70 hover:text-foreground", "aria-label": "Increase", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg", children: [
              "₹",
              (item.price * item.qty).toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(item.id), className: "grid h-9 w-9 place-items-center rounded-full text-foreground/60 transition-soft hover:bg-muted hover:text-destructive", "aria-label": "Remove", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] })
        ] }, item.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "h-fit rounded-3xl bg-muted/50 p-6 shadow-soft lg:sticky lg:top-24", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Order summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-4 space-y-2.5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { children: [
                "₹",
                subtotal.toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Shipping" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: shipping === 0 ? "Free" : `₹${shipping}` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-t border-border/60 pt-3 text-base", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-medium", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "font-display text-2xl", children: [
                "₹",
                total.toLocaleString("en-IN")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", className: "mt-5 block w-full rounded-full bg-primary px-6 py-3.5 text-center text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95", children: "Proceed to checkout" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-xs text-muted-foreground", children: "Free shipping over ₹999 · Hassle-free returns" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  CartPage as component
};
