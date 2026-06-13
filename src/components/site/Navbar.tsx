import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, ShoppingBag, Sparkles, Menu, X, Bell, User as UserIcon, LogOut, LayoutDashboard, Package, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCart } from "@/lib/cart-store";
import { useAuth } from "@/lib/auth";
import { useWishlist } from "@/lib/wishlist";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/customize", label: "Custom Builder" },
];

export function Navbar() {
  const items = useCart((s) => s.items);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [bell, setBell] = useState(false);
  const [wishlistViewed, setWishlistViewed] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("wishlist-viewed") === "true";
  });
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const wl = useWishlist();
  const count = items.reduce((n, i) => n + i.qty, 0);
  const qc = useQueryClient();

  const profile = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const notif = useQuery({
    queryKey: ["notifications", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("id, title, body, read, created_at")
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
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
    },
  });

  const handleWishlistClick = () => {
    localStorage.setItem("wishlist-viewed", "true");
    setWishlistViewed(true);
  };

  const unread = (notif.data ?? []).filter((n) => !n.read).length;

  // Track previous wishlist length to detect new items
  const prevWishlistLengthRef = useRef(wl.ids.length);

  useEffect(() => {
    // If new items were added to wishlist, reset the viewed flag
    if (wl.ids.length > prevWishlistLengthRef.current) {
      localStorage.setItem("wishlist-viewed", "false");
      setWishlistViewed(false);
    }
    prevWishlistLengthRef.current = wl.ids.length;
  }, [wl.ids.length]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-blush-gradient text-primary-foreground shadow-soft">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-2xl tracking-tight">gifted.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-foreground/70 transition-soft hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {user && (
            <div className="relative">
              <button
                aria-label="Notifications"
                onClick={() => {
                  setBell((v) => !v);
                  setMenu(false);
                  if (!bell && unread > 0) {
                    markAsRead.mutate();
                  }
                }}
                className="relative grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-soft hover:bg-muted hover:text-foreground"
              >
                <Bell className="h-4 w-4" />
                {unread > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                    {unread}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {bell && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-popover p-2 shadow-lift"
                  >
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground">Notifications</div>
                    {(notif.data ?? []).length === 0 ? (
                      <p className="px-3 py-6 text-center text-sm text-muted-foreground">You're all caught up.</p>
                    ) : (
                      <ul className="max-h-80 overflow-auto">
                        {notif.data!.map((n) => (
                          <li key={n.id} className="rounded-xl px-3 py-2 hover:bg-muted">
                            <p className="text-sm font-medium">{n.title}</p>
                            <p className="text-xs text-muted-foreground">{n.body}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <Link
            to={user ? "/wishlist" : "/auth"}
            aria-label="Wishlist"
            onClick={handleWishlistClick}
            className="relative grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-soft hover:bg-muted hover:text-foreground"
          >
            <Heart className="h-4 w-4" />
            {user && wl.ids.length > 0 && !wishlistViewed && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                {wl.ids.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-soft hover:bg-muted hover:text-foreground"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => {
                  setMenu((v) => !v);
                  setBell(false);
                }}
                aria-label="Account"
                className="grid h-10 w-10 place-items-center rounded-full bg-blush-gradient text-primary-foreground shadow-soft"
              >
                <span className="text-xs font-semibold">
                  {(profile.data?.full_name?.[0] || user.email?.[0] || "U").toUpperCase()}
                </span>
              </button>
              <AnimatePresence>
                {menu && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-popover p-1.5 shadow-lift"
                  >
                    {[
                      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
                      { to: "/orders", icon: Package, label: "My orders" },
                      { to: "/wishlist", icon: Heart, label: "Wishlist" },
                      { to: "/addresses", icon: MapPin, label: "Addresses" },
                      { to: "/profile", icon: UserIcon, label: "Profile" },
                    ].map((m) => (
                      <Link
                        key={m.to}
                        to={m.to}
                        onClick={() => setMenu(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-muted"
                      >
                        <m.icon className="h-4 w-4 text-muted-foreground" />
                        {m.label}
                      </Link>
                    ))}
                    <button
                      onClick={async () => {
                        setMenu(false);
                        await signOut();
                        navigate({ to: "/" });
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-destructive hover:bg-muted"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/auth"
              className="ml-1 hidden rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95 sm:inline-flex"
            >
              Sign in
            </Link>
          )}

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-soft hover:bg-muted hover:text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn("overflow-hidden border-t border-border/60 md:hidden")}
          >
            <nav className="flex flex-col gap-1 px-5 py-4">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-foreground/80 transition-soft hover:bg-muted"
                >
                  {n.label}
                </Link>
              ))}
              {!user && (
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
                >
                  Sign in
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
