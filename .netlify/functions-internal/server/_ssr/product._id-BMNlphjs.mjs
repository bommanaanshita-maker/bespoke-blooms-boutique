import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { b as useCart, u as useAuth, a as useWishlist, N as Navbar } from "./Navbar-FQbSlWmj.mjs";
import { F as Footer } from "./Footer-DuM0UnWI.mjs";
import { P as ProductCard } from "./ProductCard-CcRjjurh.mjs";
import { a as Route$9, p as products } from "./router-DxlzPpTF.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { S as Star, b as Sparkles, l as Minus, m as Plus, c as ShoppingBag, H as Heart, i as Truck, n as Upload } from "../_libs/lucide-react.mjs";
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
import "../_libs/zod.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function ProductPage() {
  const {
    product
  } = Route$9.useLoaderData();
  const [qty, setQty] = reactExports.useState(1);
  const [custom, setCustom] = reactExports.useState({});
  const add = useCart((s) => s.add);
  const {
    user
  } = useAuth();
  const wl = useWishlist();
  const toggle = (id) => {
    if (!user) {
      navigate({
        to: "/auth",
        search: {
          redirect: window.location.pathname
        }
      });
      return;
    }
    wl.toggle(id);
  };
  const wished = wl.has(product.id);
  const navigate = useNavigate();
  const set = (key, value) => setCustom((c) => ({
    ...c,
    [key]: value
  }));
  const addToCart = (buyNow = false) => {
    add({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty,
      customization: custom
    });
    toast.success(`${product.name} added to cart`);
    if (buyNow) navigate({
      to: "/cart"
    });
  };
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mx-auto max-w-7xl px-5 pt-6 text-xs text-muted-foreground lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground", children: "Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1.5", children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hover:text-foreground", children: "Shop" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1.5", children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: product.name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto grid max-w-7xl gap-12 px-5 py-10 lg:grid-cols-2 lg:gap-16 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        scale: 0.97
      }, animate: {
        opacity: 1,
        scale: 1
      }, transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }, className: "relative overflow-hidden rounded-[2.5rem] bg-muted shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.image, alt: product.name, width: 1024, height: 1024, className: "aspect-square w-full object-cover" }),
        product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-5 top-5 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-soft backdrop-blur", children: product.badge })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: product.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl leading-tight sm:text-5xl", children: product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-gold text-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: product.rating })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "· ",
            product.reviews,
            " reviews"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base text-muted-foreground", children: product.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-baseline gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-3xl", children: [
            "₹",
            product.price.toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "incl. taxes" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-3xl bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }),
            "Make it personal"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-4", children: product.customization.map((field) => /* @__PURE__ */ jsxRuntimeExports.jsx(CustomField, { field, value: custom[field.key] ?? "", onChange: (v) => set(field.key, v) }, field.key)) }),
          (custom.name || custom.message || custom.recipient) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl bg-blush/30 p-5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Live preview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-2xl", children: custom.recipient || custom.name || "Your name" }),
            custom.message && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm italic text-foreground/80", children: [
              '"',
              custom.message,
              '"'
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center rounded-full border border-border bg-background", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty((q) => Math.max(1, q - 1)), className: "grid h-11 w-11 place-items-center text-foreground/70 hover:text-foreground", "aria-label": "Decrease", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center text-sm font-medium", children: qty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty((q) => q + 1), className: "grid h-11 w-11 place-items-center text-foreground/70 hover:text-foreground", "aria-label": "Increase", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => addToCart(false), className: "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-soft hover:opacity-90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
            "Add to cart"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggle(product.id), "aria-label": "Wishlist", className: cn("grid h-12 w-12 place-items-center rounded-full border border-border bg-background text-foreground/70 transition-soft hover:text-primary", wished && "text-primary border-primary"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("h-4 w-4", wished && "fill-current") }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => addToCart(true), className: "mt-3 w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95", children: "Buy now" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4" }),
          "Free delivery on this gift · Dispatches in 24 hours"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-5 py-16 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl", children: "You may also love" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: related.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, index: i }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function CustomField({
  field,
  value,
  onChange
}) {
  const base = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-xs font-medium text-foreground/80", children: field.label }),
    field.kind === "text" && /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", maxLength: field.max, placeholder: field.placeholder, value, onChange: (e) => onChange(e.target.value), className: base }),
    field.kind === "message" && /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value, maxLength: 140, onChange: (e) => onChange(e.target.value), placeholder: "Write something they'll keep…", className: cn(base, "resize-none") }),
    field.kind === "select" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: field.options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onChange(o), className: cn("rounded-full border border-border bg-background px-4 py-2 text-xs transition-soft hover:border-primary", value === o && "bg-primary text-primary-foreground border-primary"), children: o }, o)) }),
    field.kind === "image" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted/40 px-4 py-6 text-sm text-muted-foreground transition-soft hover:border-primary hover:text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => onChange(e.target.files?.[0]?.name ?? "") }),
      value || "Upload an image"
    ] }),
    field.kind === "number" && /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: field.min, max: field.max, value, onChange: (e) => onChange(e.target.value), className: base })
  ] });
}
export {
  ProductPage as component
};
