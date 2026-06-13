import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navbar } from "./Navbar-FQbSlWmj.mjs";
import { F as Footer } from "./Footer-DuM0UnWI.mjs";
import { P as ProductCard } from "./ProductCard-CcRjjurh.mjs";
import { R as Route$f, p as products, c as categories } from "./router-DxlzPpTF.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import "../_libs/sonner.mjs";
import { S as Star, a as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/zod.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const sorts = [{
  id: "popular",
  label: "Popularity"
}, {
  id: "low",
  label: "Price: low to high"
}, {
  id: "high",
  label: "Price: high to low"
}, {
  id: "new",
  label: "Newest"
}];
function Shop() {
  const {
    category
  } = Route$f.useSearch();
  const [cat, setCat] = reactExports.useState(category);
  const [sort, setSort] = reactExports.useState("popular");
  const [maxPrice, setMaxPrice] = reactExports.useState(3e3);
  const [minRating, setMinRating] = reactExports.useState(0);
  const [open, setOpen] = reactExports.useState(false);
  const list = reactExports.useMemo(() => {
    let l = products.filter((p) => p.price <= maxPrice && p.rating >= minRating);
    if (cat) l = l.filter((p) => p.category === cat);
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "new") l = [...l].reverse();
    if (sort === "popular") l = [...l].sort((a, b) => b.reviews - a.reviews);
    return l;
  }, [cat, sort, maxPrice, minRating]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border/60 bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 py-12 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Shop" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl leading-tight sm:text-5xl", children: cat ? categories.find((c) => c.slug === cat)?.name : "All gifts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 max-w-xl text-sm text-muted-foreground", children: [
        list.length,
        " ",
        list.length === 1 ? "gift" : "gifts",
        " ready to be personalised."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-5 py-10 lg:grid-cols-[260px_1fr] lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: cn("space-y-8 rounded-3xl bg-card p-6 shadow-soft lg:sticky lg:top-24 lg:h-fit", !open && "hidden lg:block"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base", children: "Occasion" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCat(void 0), className: cn("rounded-full border border-border px-3 py-1.5 text-xs transition-soft hover:border-primary", !cat && "bg-primary text-primary-foreground border-primary"), children: "All" }),
            categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCat(c.slug), className: cn("rounded-full border border-border px-3 py-1.5 text-xs transition-soft hover:border-primary", cat === c.slug && "bg-primary text-primary-foreground border-primary"), children: c.name }, c.slug))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base", children: "Max price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 199, max: 3e3, step: 100, value: maxPrice, onChange: (e) => setMaxPrice(Number(e.target.value)), className: "mt-3 w-full accent-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            "Up to ₹",
            maxPrice.toLocaleString("en-IN")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base", children: "Rating" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-2", children: [0, 4, 4.5, 4.8].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setMinRating(r), className: cn("flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs transition-soft hover:border-primary", minRating === r && "bg-primary text-primary-foreground border-primary"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-current" }),
            r === 0 ? "Any" : `${r}+`
          ] }, r)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: sort, onChange: (e) => setSort(e.target.value), className: "rounded-full border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none", children: sorts.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: s.id, children: [
            "Sort: ",
            s.label
          ] }, s.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen((v) => !v), className: "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm lg:hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
            "Filters"
          ] })
        ] }),
        list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 rounded-3xl border border-dashed border-border bg-card p-12 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl", children: "No gifts match those filters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Try widening your price or rating." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3", children: list.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, index: i }, p.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Shop as component
};
