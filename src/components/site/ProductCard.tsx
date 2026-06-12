import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const wishlist = useCart((s) => s.wishlist);
  const toggle = useCart((s) => s.toggleWishlist);
  const wished = wishlist.includes(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block overflow-hidden rounded-3xl bg-card shadow-soft transition-soft hover:shadow-lift"
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-medium tracking-wide text-foreground shadow-soft backdrop-blur">
              {product.badge}
            </span>
          )}
          <button
            aria-label="Wishlist"
            onClick={(e) => {
              e.preventDefault();
              toggle(product.id);
            }}
            className={cn(
              "absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground/70 shadow-soft backdrop-blur transition-soft hover:text-primary",
              wished && "text-primary",
            )}
          >
            <Heart className={cn("h-4 w-4", wished && "fill-current")} />
          </button>
        </div>
        <div className="space-y-2 p-5">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-gold text-gold" />
            <span className="font-medium text-foreground">{product.rating}</span>
            <span>· {product.reviews} reviews</span>
          </div>
          <h3 className="font-display text-lg leading-tight">{product.name}</h3>
          <div className="flex items-center justify-between pt-1">
            <p className="text-base font-semibold">₹{product.price.toLocaleString("en-IN")}</p>
            <span className="text-xs text-muted-foreground">{product.type}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
