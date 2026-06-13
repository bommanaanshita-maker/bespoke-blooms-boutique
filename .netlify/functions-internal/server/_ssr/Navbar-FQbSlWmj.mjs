import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as create, p as persist } from "../_libs/zustand.mjs";
import { supabase } from "./client-pPoEERrW.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { b as Sparkles, B as Bell, H as Heart, c as ShoppingBag, L as LayoutDashboard, P as Package, M as MapPin, U as User, d as LogOut, X, e as Menu } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
const useCart = create()(
  persist(
    (set) => ({
      items: [],
      add: (item) => set((s) => {
        const id = item.id ?? `${item.productId}-${Date.now()}`;
        return { items: [...s.items, { ...item, id, qty: item.qty || 1 }] };
      }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) => set((s) => ({
        items: s.items.map((i) => i.id === id ? { ...i, qty: Math.max(1, qty) } : i)
      })),
      clear: () => set({ items: [] })
    }),
    { name: "gifted-cart" }
  )
);
const cartTotal = (items) => items.reduce((sum, i) => sum + i.price * i.qty, 0);
function useAuth() {
  const [session, setSession] = reactExports.useState(null);
  const [user, setUser] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  return { session, user, loading, signOut: () => supabase.auth.signOut() };
}
function useWishlist() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["wishlist", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("wishlist").select("product_id").order("created_at", { ascending: false });
      if (error) throw error;
      return data.map((r) => r.product_id);
    }
  });
  const toggle = useMutation({
    mutationFn: async (productId) => {
      if (!user) throw new Error("Not signed in");
      const has = q.data?.includes(productId);
      if (has) {
        const { error } = await supabase.from("wishlist").delete().eq("user_id", user.id).eq("product_id", productId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("wishlist").insert({ user_id: user.id, product_id: productId });
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wishlist", user?.id] })
  });
  return { ids: q.data ?? [], isLoading: q.isLoading, toggle: toggle.mutate, has: (id) => (q.data ?? []).includes(id) };
}
const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/customize", label: "Custom Builder" }
];
function Navbar() {
  const items = useCart((s) => s.items);
  const [open, setOpen] = reactExports.useState(false);
  const [menu, setMenu] = reactExports.useState(false);
  const [bell, setBell] = reactExports.useState(false);
  const [wishlistViewed, setWishlistViewed] = reactExports.useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("wishlist-viewed") === "true";
  });
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const wl = useWishlist();
  const count = items.reduce((n, i) => n + i.qty, 0);
  const qc = useQueryClient();
  const notif = useQuery({
    queryKey: ["notifications", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("notifications").select("id, title, body, read, created_at").order("created_at", { ascending: false }).limit(10);
      if (error) throw error;
      return data;
    }
  });
  const markAsRead = useMutation({
    mutationFn: async () => {
      const unreadIds = (notif.data ?? []).filter((n) => !n.read).map((n) => n.id);
      if (unreadIds.length === 0) return;
      const { error } = await supabase.from("notifications").update({ read: true }).in("id", unreadIds);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications", user?.id] });
    }
  });
  const handleWishlistClick = () => {
    localStorage.setItem("wishlist-viewed", "true");
    setWishlistViewed(true);
  };
  const unread = (notif.data ?? []).filter((n) => !n.read).length;
  const prevWishlistLengthRef = reactExports.useRef(wl.ids.length);
  reactExports.useEffect(() => {
    if (wl.ids.length > prevWishlistLengthRef.current) {
      localStorage.setItem("wishlist-viewed", "false");
      setWishlistViewed(false);
    }
    prevWishlistLengthRef.current = wl.ids.length;
  }, [wl.ids.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-full bg-blush-gradient text-primary-foreground shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl tracking-tight", children: "gifted." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-8 md:flex", children: nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: n.to,
          className: "text-sm text-foreground/70 transition-soft hover:text-foreground",
          activeProps: { className: "text-foreground font-medium" },
          activeOptions: { exact: n.to === "/" },
          children: n.label
        },
        n.to
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              "aria-label": "Notifications",
              onClick: () => {
                setBell((v) => !v);
                setMenu(false);
                if (!bell && unread > 0) {
                  markAsRead.mutate();
                }
              },
              className: "relative grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-soft hover:bg-muted hover:text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
                unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground", children: unread })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: bell && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -4 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -4 },
              className: "absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-popover p-2 shadow-lift",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 text-xs font-medium text-muted-foreground", children: "Notifications" }),
                (notif.data ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 py-6 text-center text-sm text-muted-foreground", children: "You're all caught up." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "max-h-80 overflow-auto", children: notif.data.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-xl px-3 py-2 hover:bg-muted", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: n.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: n.body })
                ] }, n.id)) })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: user ? "/wishlist" : "/auth",
            "aria-label": "Wishlist",
            onClick: handleWishlistClick,
            className: "relative grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-soft hover:bg-muted hover:text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4" }),
              user && wl.ids.length > 0 && !wishlistViewed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground", children: wl.ids.length })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/cart",
            "aria-label": "Cart",
            className: "relative grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-soft hover:bg-muted hover:text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
              count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground", children: count })
            ]
          }
        ),
        user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                setMenu((v) => !v);
                setBell(false);
              },
              "aria-label": "Account",
              className: "grid h-10 w-10 place-items-center rounded-full bg-blush-gradient text-primary-foreground shadow-soft",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: (user.user_metadata?.full_name?.[0] || user.email?.[0] || "U").toUpperCase() })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: menu && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -4 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -4 },
              className: "absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-popover p-1.5 shadow-lift",
              children: [
                [
                  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
                  { to: "/orders", icon: Package, label: "My orders" },
                  { to: "/wishlist", icon: Heart, label: "Wishlist" },
                  { to: "/addresses", icon: MapPin, label: "Addresses" },
                  { to: "/profile", icon: User, label: "Profile" }
                ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: m.to,
                    onClick: () => setMenu(false),
                    className: "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-muted",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(m.icon, { className: "h-4 w-4 text-muted-foreground" }),
                      m.label
                    ]
                  },
                  m.to
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: async () => {
                      setMenu(false);
                      await signOut();
                      navigate({ to: "/" });
                    },
                    className: "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-destructive hover:bg-muted",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
                      "Sign out"
                    ]
                  }
                )
              ]
            }
          ) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/auth",
            className: "ml-1 hidden rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95 sm:inline-flex",
            children: "Sign in"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            "aria-label": "Menu",
            onClick: () => setOpen((v) => !v),
            className: "grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-soft hover:bg-muted hover:text-foreground md:hidden",
            children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
        className: cn("overflow-hidden border-t border-border/60 md:hidden"),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col gap-1 px-5 py-4", children: [
          nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: n.to,
              onClick: () => setOpen(false),
              className: "rounded-lg px-3 py-2 text-sm text-foreground/80 transition-soft hover:bg-muted",
              children: n.label
            },
            n.to
          )),
          !user && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/auth",
              onClick: () => setOpen(false),
              className: "mt-2 rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground",
              children: "Sign in"
            }
          )
        ] })
      }
    ) })
  ] });
}
export {
  Navbar as N,
  useWishlist as a,
  useCart as b,
  cartTotal as c,
  useAuth as u
};
