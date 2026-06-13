import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as Sparkles, I as Instagram, F as Facebook, T as Twitter } from "../_libs/lucide-react.mjs";
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-24 border-t border-border/60 bg-muted/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl grid-cols-3 gap-10 px-5 py-16 lg:grid-cols-4 lg:px-8 [&>div:first-child]:col-span-3 lg:[&>div:first-child]:col-span-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-full bg-blush-gradient text-primary-foreground shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl tracking-tight", children: "gifted." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-sm text-sm text-muted-foreground", children: "Hand-crafted, personalised gifts for the people you love. Delivered to their doorstep with care." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex gap-2", children: [Instagram, Facebook, Twitter].map((Icon, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#",
            "aria-label": "Social",
            className: "grid h-9 w-9 place-items-center rounded-full bg-background text-foreground/70 shadow-soft transition-soft hover:text-foreground",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
          },
          i
        )) })
      ] }),
      [
        { title: "Shop", links: ["Birthday", "Anniversary", "Hampers", "Cards"] },
        { title: "Company", links: ["About", "Sustainability", "Careers", "Press"] },
        { title: "Support", links: ["Contact", "Shipping", "Returns", "FAQ"] }
      ].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-base", children: col.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm text-muted-foreground", children: col.links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "transition-soft hover:text-foreground", children: l }) }, l)) })
      ] }, col.title))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/60 py-6 text-center text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " gifted. — crafted with love."
    ] })
  ] });
}
export {
  Footer as F
};
