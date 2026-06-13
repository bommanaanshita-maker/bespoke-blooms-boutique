import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { Q as notFound, S as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { supabase } from "./client-pPoEERrW.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-BiaiRWok.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-xl", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-soft hover:opacity-90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-soft hover:opacity-90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-soft hover:bg-muted",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$g = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "gifted. — personalised gifts for every occasion" },
      {
        name: "description",
        content: "Hand-crafted, personalised gifts for birthdays, anniversaries, weddings and more. Customise, preview and ship with care."
      },
      { property: "og:title", content: "gifted. — personalised gifts for every occasion" },
      {
        property: "og:description",
        content: "Customise, preview and ship beautifully crafted gifts to the people you love."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$g.useRouteContext();
  const router2 = useRouter();
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    let mounted = true;
    import("./client-pPoEERrW.mjs").then(({ supabase: supabase2 }) => {
      if (!mounted) return;
      const { data: sub } = supabase2.auth.onAuthStateChange((event) => {
        if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
        router2.invalidate();
        if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
      });
      return () => sub.subscription.unsubscribe();
    });
    return () => {
      mounted = false;
    };
  }, [queryClient, router2]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center" })
  ] });
}
const $$splitComponentImporter$f = () => import("./shop-CVLQeK1y.mjs");
const Route$f = createFileRoute("/shop")({
  head: () => ({
    meta: [{
      title: "Shop gifts — gifted."
    }, {
      name: "description",
      content: "Browse personalised gifts by occasion, type and price."
    }]
  }),
  validateSearch: (s) => ({
    category: typeof s.category === "string" ? s.category : void 0
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./reset-password-D0iDjrNR.mjs");
const Route$e = createFileRoute("/reset-password")({
  head: () => ({
    meta: [{
      title: "Set new password — gifted."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./forgot-password-C3aqzBC6.mjs");
const Route$d = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{
      title: "Forgot password — gifted."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./auth-CyvyP-g8.mjs");
const searchSchema = objectType({
  redirect: stringType().optional()
});
const Route$c = createFileRoute("/auth")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [{
      title: "Sign in — gifted."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./route-BFsOu0JM.mjs");
const Route$b = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({
    location
  }) => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({
        to: "/auth",
        search: {
          redirect: location.href
        }
      });
    }
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./index-BWgw9yH7.mjs");
const Route$a = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "gifted. — personalised gifts for every occasion"
    }, {
      name: "description",
      content: "Hand-crafted, personalised gifts for birthdays, anniversaries, weddings and more. Customise, preview and ship with care."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const mug = "/assets/product-mug-CkZ-A5eN.jpg";
const hamper = "/assets/product-hamper-uCf84Dwb.jpg";
const card = "/assets/product-card-4yUgO359.jpg";
const frame = "/assets/product-frame-DVfEHZ4d.jpg";
const flowers = "/assets/product-flowers-D_BKUgoA.jpg";
const teddy = "/assets/product-teddy-9Iq1F1Hi.jpg";
const candle = "/assets/product-candle-BbC8vL5e.jpg";
const categories = [
  { slug: "birthday", name: "Birthday Gifts", icon: "Cake", tint: "blush" },
  { slug: "anniversary", name: "Anniversary", icon: "Heart", tint: "lavender" },
  { slug: "kids", name: "Kids Gifts", icon: "Toy2", tint: "cream" },
  { slug: "baby", name: "Baby Gifts", icon: "Baby", tint: "blush" },
  { slug: "cards", name: "Greeting Cards", icon: "Mail", tint: "lavender" },
  { slug: "hampers", name: "Custom Hampers", icon: "Package", tint: "cream" },
  { slug: "wedding", name: "Wedding Gifts", icon: "Ring", tint: "blush" },
  { slug: "corporate", name: "Corporate", icon: "Briefcase", tint: "lavender" },
  { slug: "festival", name: "Festival", icon: "Sparkles", tint: "cream" }
];
const products = [
  {
    id: "blush-bloom-bouquet",
    name: "Blush Bloom Bouquet",
    price: 1499,
    rating: 4.9,
    reviews: 312,
    category: "anniversary",
    occasion: ["Anniversary", "Birthday", "Wedding"],
    type: "Flowers",
    image: flowers,
    description: "A breathtaking arrangement of soft pink roses and ivory peonies, hand-tied in cream paper with a silk ribbon.",
    customization: [
      { kind: "message", key: "message", label: "Personal message" },
      { kind: "select", key: "wrap", label: "Wrap color", options: ["Cream", "Blush", "Lavender"] }
    ],
    badge: "Best Seller"
  },
  {
    id: "personalised-floral-mug",
    name: "Personalised Floral Mug",
    price: 499,
    rating: 4.8,
    reviews: 528,
    category: "birthday",
    occasion: ["Birthday", "Festival"],
    type: "Mug",
    image: mug,
    description: "A delicate ceramic mug printed with a watercolour bloom and the name of your choice. Dishwasher safe.",
    customization: [
      { kind: "text", key: "name", label: "Name to print", max: 14, placeholder: "e.g. Aanya" },
      { kind: "message", key: "message", label: "Tiny message (optional)" },
      { kind: "select", key: "font", label: "Font style", options: ["Script", "Serif", "Modern"] }
    ]
  },
  {
    id: "luxe-celebration-hamper",
    name: "Luxe Celebration Hamper",
    price: 2899,
    rating: 4.9,
    reviews: 184,
    category: "hampers",
    occasion: ["Anniversary", "Festival", "Corporate"],
    type: "Hamper",
    image: hamper,
    description: "Belgian chocolates, a soy candle, a hand-tied dried bloom and a personal card — wrapped in a woven basket.",
    customization: [
      { kind: "select", key: "chocolate", label: "Chocolate", options: ["Dark", "Milk", "Mixed"] },
      { kind: "select", key: "candle", label: "Candle scent", options: ["Rose", "Vanilla", "Oud"] },
      { kind: "message", key: "message", label: "Card message" }
    ],
    badge: "New"
  },
  {
    id: "gold-foil-greeting-card",
    name: "Gold Foil Greeting Card",
    price: 199,
    rating: 4.7,
    reviews: 902,
    category: "cards",
    occasion: ["Birthday", "Anniversary", "Wedding"],
    type: "Card",
    image: card,
    description: "Hand-pressed blush cardstock with gold foil lettering. Personalise the recipient's name and message.",
    customization: [
      { kind: "text", key: "recipient", label: "Recipient name", max: 24 },
      { kind: "message", key: "message", label: "Inside message" },
      { kind: "select", key: "font", label: "Font", options: ["Script", "Serif", "Modern"] }
    ]
  },
  {
    id: "lavender-photo-frame",
    name: "Lavender Photo Frame",
    price: 899,
    rating: 4.8,
    reviews: 241,
    category: "anniversary",
    occasion: ["Anniversary", "Wedding"],
    type: "Frame",
    image: frame,
    description: "A warm wooden frame tied with a lavender ribbon — perfect for a memory you'll keep on the mantelpiece.",
    customization: [
      { kind: "image", key: "photo", label: "Upload your photo" },
      { kind: "text", key: "quote", label: "Engraved quote", max: 40 }
    ]
  },
  {
    id: "cuddle-cream-teddy",
    name: "Cuddle Cream Teddy",
    price: 799,
    rating: 4.9,
    reviews: 416,
    category: "kids",
    occasion: ["Baby", "Birthday"],
    type: "Toy",
    image: teddy,
    description: "A buttery-soft cream teddy with a satin pink bow — the kind of friend you'll want to keep forever.",
    customization: [
      { kind: "text", key: "name", label: "Embroider name", max: 12 },
      { kind: "select", key: "bow", label: "Bow color", options: ["Pink", "Cream", "Lavender"] }
    ]
  },
  {
    id: "rose-petal-candle",
    name: "Rose Petal Candle",
    price: 1199,
    rating: 4.8,
    reviews: 167,
    category: "festival",
    occasion: ["Festival", "Anniversary", "Corporate"],
    type: "Candle",
    image: candle,
    description: "Hand-poured soy wax candle infused with damask rose and eucalyptus. 45 hours of soft, lingering scent.",
    customization: [
      { kind: "select", key: "scent", label: "Scent", options: ["Rose", "Eucalyptus", "Sandalwood"] },
      { kind: "text", key: "label", label: "Custom label", max: 18 }
    ]
  }
];
function getProduct(id) {
  return products.find((p) => p.id === id);
}
const $$splitComponentImporter$9 = () => import("./product._id-BMNlphjs.mjs");
const $$splitNotFoundComponentImporter = () => import("./product._id-B84kSLZe.mjs");
const Route$9 = createFileRoute("/product/$id")({
  loader: ({
    params
  }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return {
      product: p
    };
  },
  head: ({
    loaderData
  }) => ({
    meta: loaderData ? [{
      title: `${loaderData.product.name} — gifted.`
    }, {
      name: "description",
      content: loaderData.product.description
    }, {
      property: "og:title",
      content: `${loaderData.product.name} — gifted.`
    }, {
      property: "og:description",
      content: loaderData.product.description
    }, {
      property: "og:image",
      content: loaderData.product.image
    }] : []
  }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./wishlist-Z8_blADe.mjs");
const Route$8 = createFileRoute("/_authenticated/wishlist")({
  head: () => ({
    meta: [{
      title: "Wishlist — gifted."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./profile-DCMb5T2k.mjs");
const Route$7 = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [{
      title: "Profile — gifted."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./orders-dEmE82j8.mjs");
const Route$6 = createFileRoute("/_authenticated/orders")({
  head: () => ({
    meta: [{
      title: "My orders — gifted."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./dashboard-D_-yIFW1.mjs");
const Route$5 = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — gifted."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./customize-fe0ttEmN.mjs");
const Route$4 = createFileRoute("/_authenticated/customize")({
  head: () => ({
    meta: [{
      title: "Custom gift builder — gifted."
    }, {
      name: "description",
      content: "Build the perfect gift step by step."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./checkout-CBabwj90.mjs");
const Route$3 = createFileRoute("/_authenticated/checkout")({
  head: () => ({
    meta: [{
      title: "Checkout — gifted."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./cart-DuMhnz6z.mjs");
const Route$2 = createFileRoute("/_authenticated/cart")({
  head: () => ({
    meta: [{
      title: "Your cart — gifted."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./addresses-CirVvYIq.mjs");
const Route$1 = createFileRoute("/_authenticated/addresses")({
  head: () => ({
    meta: [{
      title: "Saved addresses — gifted."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./orders._id-B7E_92Mt.mjs");
const Route = createFileRoute("/_authenticated/orders/$id")({
  head: () => ({
    meta: [{
      title: "Order details — gifted."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ShopRoute = Route$f.update({
  id: "/shop",
  path: "/shop",
  getParentRoute: () => Route$g
});
const ResetPasswordRoute = Route$e.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => Route$g
});
const ForgotPasswordRoute = Route$d.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => Route$g
});
const AuthRoute = Route$c.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$g
});
const AuthenticatedRouteRoute = Route$b.update({
  id: "/_authenticated",
  getParentRoute: () => Route$g
});
const IndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$g
});
const ProductIdRoute = Route$9.update({
  id: "/product/$id",
  path: "/product/$id",
  getParentRoute: () => Route$g
});
const AuthenticatedWishlistRoute = Route$8.update({
  id: "/wishlist",
  path: "/wishlist",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedProfileRoute = Route$7.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedOrdersRoute = Route$6.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedDashboardRoute = Route$5.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedCustomizeRoute = Route$4.update({
  id: "/customize",
  path: "/customize",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedCheckoutRoute = Route$3.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedCartRoute = Route$2.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAddressesRoute = Route$1.update({
  id: "/addresses",
  path: "/addresses",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedOrdersIdRoute = Route.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => AuthenticatedOrdersRoute
});
const AuthenticatedOrdersRouteChildren = {
  AuthenticatedOrdersIdRoute
};
const AuthenticatedOrdersRouteWithChildren = AuthenticatedOrdersRoute._addFileChildren(AuthenticatedOrdersRouteChildren);
const AuthenticatedRouteRouteChildren = {
  AuthenticatedAddressesRoute,
  AuthenticatedCartRoute,
  AuthenticatedCheckoutRoute,
  AuthenticatedCustomizeRoute,
  AuthenticatedDashboardRoute,
  AuthenticatedOrdersRoute: AuthenticatedOrdersRouteWithChildren,
  AuthenticatedProfileRoute,
  AuthenticatedWishlistRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute,
  ForgotPasswordRoute,
  ResetPasswordRoute,
  ShopRoute,
  ProductIdRoute
};
const routeTree = Route$g._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$f as R,
  Route$9 as a,
  Route as b,
  categories as c,
  getProduct as g,
  products as p,
  router as r
};
