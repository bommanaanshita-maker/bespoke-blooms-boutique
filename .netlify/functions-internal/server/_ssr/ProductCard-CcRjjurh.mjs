import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, a as useWishlist } from "./Navbar-FQbSlWmj.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { H as Heart, S as Star } from "../_libs/lucide-react.mjs";
function ProductCard({ product, index = 0 }) {
  const { user } = useAuth();
  const wl = useWishlist();
  const navigate = useNavigate();
  const wished = wl.has(product.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.article,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] },
      className: "group relative",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/product/$id",
          params: { id: product.id },
          className: "block overflow-hidden rounded-3xl bg-card shadow-soft transition-soft hover:shadow-lift",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.image,
                  alt: product.name,
                  loading: "lazy",
                  width: 1024,
                  height: 1024,
                  className: "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                }
              ),
              product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-medium tracking-wide text-foreground shadow-soft backdrop-blur", children: product.badge }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  "aria-label": "Wishlist",
                  onClick: (e) => {
                    e.preventDefault();
                    if (!user) {
                      navigate({ to: "/auth", search: { redirect: window.location.pathname } });
                      return;
                    }
                    wl.toggle(product.id);
                  },
                  className: cn(
                    "absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground/70 shadow-soft backdrop-blur transition-soft hover:text-primary",
                    wished && "text-primary"
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("h-4 w-4", wished && "fill-current") })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-gold text-gold" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: product.rating }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "· ",
                  product.reviews,
                  " reviews"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg leading-tight", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-semibold", children: [
                  "₹",
                  product.price.toLocaleString("en-IN")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: product.type })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
export {
  ProductCard as P
};
