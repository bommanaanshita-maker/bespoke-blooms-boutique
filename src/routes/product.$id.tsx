import { createFileRoute, notFound, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, ShoppingBag, Sparkles, Star, Truck, Upload } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { getProduct, products, type CustomizationField } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — gifted.` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — gifted.` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl">Product not found</h1>
        <Link to="/shop" className="mt-6 inline-block text-sm text-primary underline">
          Back to shop
        </Link>
      </div>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [custom, setCustom] = useState<Record<string, string>>({});
  const add = useCart((s) => s.add);
  const toggle = useCart((s) => s.toggleWishlist);
  const wished = useCart((s) => s.wishlist.includes(product.id));
  const navigate = useNavigate();

  const set = (key: string, value: string) => setCustom((c) => ({ ...c, [key]: value }));

  const addToCart = (buyNow = false) => {
    add({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty,
      customization: custom,
    });
    toast.success(`${product.name} added to cart`);
    if (buyNow) navigate({ to: "/cart" });
  };

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <nav className="mx-auto max-w-7xl px-5 pt-6 text-xs text-muted-foreground lg:px-8">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-1.5">/</span>
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <span className="mx-1.5">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-10 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] bg-muted shadow-card"
        >
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover"
          />
          {product.badge && (
            <span className="absolute left-5 top-5 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-soft backdrop-blur">
              {product.badge}
            </span>
          )}
        </motion.div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.type}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="font-medium">{product.rating}</span>
            </span>
            <span className="text-muted-foreground">· {product.reviews} reviews</span>
          </div>
          <p className="mt-5 text-base text-muted-foreground">{product.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl">₹{product.price.toLocaleString("en-IN")}</span>
            <span className="text-xs text-muted-foreground">incl. taxes</span>
          </div>

          <div className="mt-8 rounded-3xl bg-card p-6 shadow-soft">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-primary" />
              Make it personal
            </div>
            <div className="mt-4 space-y-4">
              {product.customization.map((field) => (
                <CustomField key={field.key} field={field} value={custom[field.key] ?? ""} onChange={(v) => set(field.key, v)} />
              ))}
            </div>

            {(custom.name || custom.message || custom.recipient) && (
              <div className="mt-5 rounded-2xl bg-blush/30 p-5 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Live preview</p>
                <p className="mt-2 font-display text-2xl">
                  {custom.recipient || custom.name || "Your name"}
                </p>
                {custom.message && (
                  <p className="mt-1 text-sm italic text-foreground/80">"{custom.message}"</p>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-border bg-background">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-11 w-11 place-items-center text-foreground/70 hover:text-foreground"
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid h-11 w-11 place-items-center text-foreground/70 hover:text-foreground"
                aria-label="Increase"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => addToCart(false)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-soft hover:opacity-90"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to cart
            </button>
            <button
              onClick={() => toggle(product.id)}
              aria-label="Wishlist"
              className={cn(
                "grid h-12 w-12 place-items-center rounded-full border border-border bg-background text-foreground/70 transition-soft hover:text-primary",
                wished && "text-primary border-primary",
              )}
            >
              <Heart className={cn("h-4 w-4", wished && "fill-current")} />
            </button>
          </div>

          <button
            onClick={() => addToCart(true)}
            className="mt-3 w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95"
          >
            Buy now
          </button>

          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Truck className="h-4 w-4" />
            Free delivery on this gift · Dispatches in 24 hours
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <h2 className="font-display text-3xl">You may also love</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function CustomField({
  field,
  value,
  onChange,
}: {
  field: CustomizationField;
  value: string;
  onChange: (v: string) => void;
}) {
  const base =
    "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none";

  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground/80">{field.label}</span>
      {field.kind === "text" && (
        <input
          type="text"
          maxLength={field.max}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )}
      {field.kind === "message" && (
        <textarea
          rows={3}
          value={value}
          maxLength={140}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write something they'll keep…"
          className={cn(base, "resize-none")}
        />
      )}
      {field.kind === "select" && (
        <div className="flex flex-wrap gap-2">
          {field.options.map((o) => (
            <button
              type="button"
              key={o}
              onClick={() => onChange(o)}
              className={cn(
                "rounded-full border border-border bg-background px-4 py-2 text-xs transition-soft hover:border-primary",
                value === o && "bg-primary text-primary-foreground border-primary",
              )}
            >
              {o}
            </button>
          ))}
        </div>
      )}
      {field.kind === "image" && (
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted/40 px-4 py-6 text-sm text-muted-foreground transition-soft hover:border-primary hover:text-foreground">
          <Upload className="h-4 w-4" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onChange(e.target.files?.[0]?.name ?? "")}
          />
          {value || "Upload an image"}
        </label>
      )}
      {field.kind === "number" && (
        <input
          type="number"
          min={field.min}
          max={field.max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )}
    </label>
  );
}
