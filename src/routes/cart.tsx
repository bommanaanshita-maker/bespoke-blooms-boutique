import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { cartTotal, useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your cart — gifted." }] }),
  component: CartPage,
});

function CartPage() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const setQty = useCart((s) => s.setQty);
  const subtotal = cartTotal(items);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Cart</p>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">Your gift bag</h1>

        {items.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-border bg-card p-16 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-muted">
              <ShoppingBag className="h-5 w-5 text-foreground/70" />
            </span>
            <p className="mt-5 font-display text-2xl">Your cart is empty</p>
            <p className="mt-2 text-sm text-muted-foreground">Let's find something they'll love.</p>
            <Link
              to="/shop"
              className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95"
            >
              Browse gifts
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-4">
              {items.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="grid grid-cols-[88px_minmax(0,1fr)_auto] gap-4 rounded-3xl bg-card p-4 shadow-soft sm:grid-cols-[112px_minmax(0,1fr)_auto] sm:gap-5 sm:p-5"
                >
                  <img
                    src={item.image}
                    alt=""
                    width={112}
                    height={112}
                    loading="lazy"
                    className="aspect-square w-full rounded-2xl object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-lg">{item.name}</h3>
                    {item.customization && Object.keys(item.customization).length > 0 && (
                      <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                        {Object.entries(item.customization)
                          .filter(([, v]) => v)
                          .slice(0, 3)
                          .map(([k, v]) => (
                            <li key={k} className="truncate">
                              <span className="capitalize">{k}:</span> {v}
                            </li>
                          ))}
                      </ul>
                    )}
                    <div className="mt-3 inline-flex items-center rounded-full border border-border bg-background">
                      <button
                        onClick={() => setQty(item.id, item.qty - 1)}
                        className="grid h-9 w-9 place-items-center text-foreground/70 hover:text-foreground"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                      <button
                        onClick={() => setQty(item.id, item.qty + 1)}
                        className="grid h-9 w-9 place-items-center text-foreground/70 hover:text-foreground"
                        aria-label="Increase"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="font-display text-lg">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </span>
                    <button
                      onClick={() => remove(item.id)}
                      className="grid h-9 w-9 place-items-center rounded-full text-foreground/60 transition-soft hover:bg-muted hover:text-destructive"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.li>
              ))}
            </ul>

            <aside className="h-fit rounded-3xl bg-muted/50 p-6 shadow-soft lg:sticky lg:top-24">
              <h2 className="font-display text-xl">Order summary</h2>
              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>₹{subtotal.toLocaleString("en-IN")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd>{shipping === 0 ? "Free" : `₹${shipping}`}</dd>
                </div>
                <div className="flex justify-between border-t border-border/60 pt-3 text-base">
                  <dt className="font-medium">Total</dt>
                  <dd className="font-display text-2xl">₹{total.toLocaleString("en-IN")}</dd>
                </div>
              </dl>
              <Link
                to="/checkout"
                className="mt-5 block w-full rounded-full bg-primary px-6 py-3.5 text-center text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95"
              >
                Proceed to checkout
              </Link>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Free shipping over ₹999 · Hassle-free returns
              </p>
            </aside>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
