import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { getProduct } from "@/lib/products";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/_authenticated/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — gifted." }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const wl = useWishlist();
  const add = useCart((s) => s.add);

  const products = wl.ids.map((id) => getProduct(id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Account</p>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">Wishlist</h1>

        {products.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-border bg-card p-16 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-muted">
              <Heart className="h-5 w-5" />
            </span>
            <p className="mt-5 font-display text-2xl">No favourites yet</p>
            <Link to="/shop" className="mt-4 inline-block text-sm text-primary underline">
              Browse gifts
            </Link>
          </div>
        ) : (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <li key={p!.id} className="overflow-hidden rounded-3xl bg-card shadow-soft">
                <Link to="/product/$id" params={{ id: p!.id }}>
                  <img src={p!.image} alt={p!.name} className="aspect-square w-full object-cover" />
                </Link>
                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg leading-tight">{p!.name}</h3>
                      <p className="text-base font-semibold">₹{p!.price.toLocaleString("en-IN")}</p>
                    </div>
                    <button
                      onClick={() => wl.toggle(p!.id)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-muted text-destructive hover:bg-muted/80"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      add({ productId: p!.id, name: p!.name, price: p!.price, image: p!.image, qty: 1 });
                      toast.success("Added to cart");
                    }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-95"
                  >
                    <ShoppingBag className="h-4 w-4" /> Move to cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Footer />
    </div>
  );
}
