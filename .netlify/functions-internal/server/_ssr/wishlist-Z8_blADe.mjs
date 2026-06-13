import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as useWishlist, b as useCart, N as Navbar } from "./Navbar-FQbSlWmj.mjs";
import { F as Footer } from "./Footer-DuM0UnWI.mjs";
import { g as getProduct } from "./router-DxlzPpTF.mjs";
import { H as Heart, o as Trash2, c as ShoppingBag } from "../_libs/lucide-react.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/zod.mjs";
function WishlistPage() {
  const wl = useWishlist();
  const add = useCart((s) => s.add);
  const products = wl.ids.map((id) => getProduct(id)).filter(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-5 py-12 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl leading-tight sm:text-5xl", children: "Wishlist" }),
      products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 rounded-3xl border border-dashed border-border bg-card p-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto grid h-14 w-14 place-items-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 font-display text-2xl", children: "No favourites yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-4 inline-block text-sm text-primary underline", children: "Browse gifts" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "overflow-hidden rounded-3xl bg-card shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: {
          id: p.id
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: p.name, className: "aspect-square w-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg leading-tight", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-semibold", children: [
                "₹",
                p.price.toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => wl.toggle(p.id), className: "grid h-9 w-9 place-items-center rounded-full bg-muted text-destructive hover:bg-muted/80", "aria-label": "Remove", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            add({
              productId: p.id,
              name: p.name,
              price: p.price,
              image: p.image,
              qty: 1
            });
            toast.success("Added to cart");
          }, className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-95", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
            " Move to cart"
          ] })
        ] })
      ] }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  WishlistPage as component
};
