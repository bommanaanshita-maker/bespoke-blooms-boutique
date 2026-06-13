import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { b as useCart, N as Navbar } from "./Navbar-FQbSlWmj.mjs";
import { F as Footer } from "./Footer-DuM0UnWI.mjs";
import { p as products } from "./router-DxlzPpTF.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { p as Check, G as Gift, q as ArrowLeft, A as ArrowRight } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
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
const occasions = ["Birthday", "Anniversary", "Baby Shower", "Wedding", "Festival"];
const wraps = [{
  id: "blush",
  name: "Blush silk",
  price: 149
}, {
  id: "cream",
  name: "Cream ribbon",
  price: 99
}, {
  id: "lavender",
  name: "Lavender bow",
  price: 129
}];
const steps = ["Occasion", "Items", "Message", "Wrap", "Preview"];
function Customize() {
  const [step, setStep] = reactExports.useState(0);
  const [occasion, setOccasion] = reactExports.useState("");
  const [picked, setPicked] = reactExports.useState([]);
  const [message, setMessage] = reactExports.useState("");
  const [wrap, setWrap] = reactExports.useState(wraps[0].id);
  const add = useCart((s) => s.add);
  const navigate = useNavigate();
  const togglePick = (id) => setPicked((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const itemTotal = picked.reduce((sum, id) => {
    const p = products.find((x) => x.id === id);
    return sum + (p?.price ?? 0);
  }, 0);
  const wrapPrice = wraps.find((w) => w.id === wrap)?.price ?? 0;
  const total = itemTotal + wrapPrice;
  const canNext = step === 0 && !!occasion || step === 1 && picked.length > 0 || step === 2 && message.trim().length > 0 || step === 3 || step === 4;
  const checkout = () => {
    picked.forEach((id) => {
      const p = products.find((x) => x.id === id);
      if (p) {
        add({
          productId: p.id,
          name: p.name,
          price: p.price,
          image: p.image,
          qty: 1,
          customization: {
            occasion,
            message,
            wrap
          }
        });
      }
    });
    toast.success("Custom hamper added to cart");
    navigate({
      to: "/cart"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-hero-gradient", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-5 py-16 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Custom builder" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl leading-tight sm:text-5xl", children: "Design a gift, step by step." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-lg text-sm text-muted-foreground", children: "Choose the occasion, pick the items, add a message — we'll wrap and ship it beautifully." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex items-center gap-2 overflow-x-auto pb-2", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-8 w-8 place-items-center rounded-full border text-xs transition-soft", i <= step ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground"), children: i < step ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : i + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-xs", i === step ? "font-medium text-foreground" : "text-muted-foreground"), children: s }),
        i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1 h-px w-6 bg-border" })
      ] }, s)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto grid max-w-5xl gap-10 px-5 py-12 lg:grid-cols-[1fr_320px] lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card p-8 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          x: 12
        }, animate: {
          opacity: 1,
          x: 0
        }, exit: {
          opacity: 0,
          x: -12
        }, transition: {
          duration: 0.3
        }, children: [
          step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "What's the occasion?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-3 sm:grid-cols-2", children: occasions.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOccasion(o), className: cn("rounded-2xl border border-border bg-background p-5 text-left transition-soft hover:border-primary", occasion === o && "border-primary bg-blush/30"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg", children: o }) }, o)) })
          ] }),
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Pick your items" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Add as many as you like." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-2", children: products.map((p) => {
              const on = picked.includes(p.id);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => togglePick(p.id), className: cn("flex items-center gap-4 rounded-2xl border border-border bg-background p-3 text-left transition-soft hover:border-primary", on && "border-primary bg-blush/20"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: "", width: 80, height: 80, className: "h-20 w-20 rounded-xl object-cover", loading: "lazy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-display text-base", children: p.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: p.type }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm font-medium", children: [
                    "₹",
                    p.price.toLocaleString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border", on && "border-primary bg-primary text-primary-foreground"), children: on && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) })
              ] }, p.id);
            }) })
          ] }),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Add your message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 5, value: message, onChange: (e) => setMessage(e.target.value), maxLength: 240, placeholder: "Something they'll keep forever…", className: "mt-6 w-full resize-none rounded-2xl border border-border bg-background p-4 text-sm focus:border-primary focus:outline-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
              message.length,
              "/240"
            ] })
          ] }),
          step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Choose your wrap" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-3 sm:grid-cols-3", children: wraps.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setWrap(w.id), className: cn("rounded-2xl border border-border bg-background p-5 text-left transition-soft hover:border-primary", wrap === w.id && "border-primary bg-blush/30"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base", children: w.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
                "+ ₹",
                w.price
              ] })
            ] }, w.id)) })
          ] }),
          step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Your custom gift" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl bg-blush/30 p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "For" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-xl", children: occasion }),
              message && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 border-t border-border/60 pt-3 text-sm italic", children: [
                '"',
                message,
                '"'
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-5 space-y-3", children: [
              picked.map((id) => {
                const p = products.find((x) => x.id === id);
                if (!p) return null;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: "", width: 48, height: 48, className: "h-12 w-12 rounded-lg object-cover", loading: "lazy" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: p.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                    "₹",
                    p.price.toLocaleString("en-IN")
                  ] })
                ] }, id);
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-12 w-12 place-items-center rounded-lg bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-5 w-5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1", children: [
                  wraps.find((w) => w.id === wrap)?.name,
                  " wrap"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                  "₹",
                  wrapPrice
                ] })
              ] })
            ] })
          ] })
        ] }, step) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex items-center justify-between border-t border-border/60 pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStep((s) => Math.max(0, s - 1)), disabled: step === 0, className: "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-foreground/70 transition-soft hover:bg-muted disabled:opacity-40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Back"
          ] }),
          step < steps.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStep((s) => s + 1), disabled: !canNext, className: "inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-soft hover:opacity-95 disabled:opacity-40", children: [
            "Next",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: checkout, disabled: picked.length === 0, className: "inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-soft hover:opacity-90 disabled:opacity-40", children: "Add to cart" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "h-fit rounded-3xl bg-muted/50 p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Your gift" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-display text-xl", children: occasion || "Build a gift" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          picked.length,
          " item",
          picked.length !== 1 && "s",
          " · ",
          wraps.find((w) => w.id === wrap)?.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-baseline justify-between border-t border-border/60 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl", children: [
            "₹",
            total.toLocaleString("en-IN")
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Customize as component
};
