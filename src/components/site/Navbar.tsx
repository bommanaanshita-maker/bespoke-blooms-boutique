import { Link } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-store";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/customize", label: "Custom Builder" },
];

export function Navbar() {
  const items = useCart((s) => s.items);
  const wishlist = useCart((s) => s.wishlist);
  const [open, setOpen] = useState(false);
  const count = items.reduce((n, i) => n + i.qty, 0);

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
          <button
            aria-label="Search"
            className="hidden h-10 w-10 place-items-center rounded-full text-foreground/70 transition-soft hover:bg-muted hover:text-foreground md:grid"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link
            to="/cart"
            aria-label="Wishlist"
            className="relative grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-soft hover:bg-muted hover:text-foreground"
          >
            <Heart className="h-4 w-4" />
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                {wishlist.length}
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
            className="overflow-hidden border-t border-border/60 md:hidden"
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
