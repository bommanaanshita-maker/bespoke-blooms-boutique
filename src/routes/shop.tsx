import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/lib/products";
import { cn } from "@/lib/utils";

type Search = { category?: string };

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop gifts — gifted." },
      { name: "description", content: "Browse personalised gifts by occasion, type and price." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  component: Shop,
});

const sorts = [
  { id: "popular", label: "Popularity" },
  { id: "low", label: "Price: low to high" },
  { id: "high", label: "Price: high to low" },
  { id: "new", label: "Newest" },
] as const;

function Shop() {
  const { category } = Route.useSearch();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | undefined>(category);
  const [sort, setSort] = useState<(typeof sorts)[number]["id"]>("popular");
  const [maxPrice, setMaxPrice] = useState(3000);
  const [minRating, setMinRating] = useState(0);
  const [open, setOpen] = useState(false);

  const list = useMemo(() => {
    let l = products.filter((p) => p.price <= maxPrice && p.rating >= minRating);
    if (cat) l = l.filter((p) => p.category === cat);
    if (q) l = l.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "new") l = [...l].reverse();
    if (sort === "popular") l = [...l].sort((a, b) => b.reviews - a.reviews);
    return l;
  }, [q, cat, sort, maxPrice, minRating]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="border-b border-border/60 bg-muted/40">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Shop</p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
            {cat ? categories.find((c) => c.slug === cat)?.name : "All gifts"}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {list.length} {list.length === 1 ? "gift" : "gifts"} ready to be personalised.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside
          className={cn(
            "space-y-8 rounded-3xl bg-card p-6 shadow-soft lg:sticky lg:top-24 lg:h-fit",
            !open && "hidden lg:block",
          )}
        >
          <div>
            <h3 className="font-display text-base">Occasion</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setCat(undefined)}
                className={cn(
                  "rounded-full border border-border px-3 py-1.5 text-xs transition-soft hover:border-primary",
                  !cat && "bg-primary text-primary-foreground border-primary",
                )}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setCat(c.slug)}
                  className={cn(
                    "rounded-full border border-border px-3 py-1.5 text-xs transition-soft hover:border-primary",
                    cat === c.slug && "bg-primary text-primary-foreground border-primary",
                  )}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-base">Max price</h3>
            <input
              type="range"
              min={199}
              max={3000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-primary"
            />
            <p className="mt-1 text-xs text-muted-foreground">Up to ₹{maxPrice.toLocaleString("en-IN")}</p>
          </div>

          <div>
            <h3 className="font-display text-base">Rating</h3>
            <div className="mt-3 flex gap-2">
              {[0, 4, 4.5, 4.8].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={cn(
                    "flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs transition-soft hover:border-primary",
                    minRating === r && "bg-primary text-primary-foreground border-primary",
                  )}
                >
                  <Star className="h-3 w-3 fill-current" />
                  {r === 0 ? "Any" : `${r}+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search gifts…"
                className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-4 text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof sorts)[number]["id"])}
              className="rounded-full border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
            >
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  Sort: {s.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>

          {list.length === 0 ? (
            <div className="mt-16 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
              <p className="font-display text-2xl">No gifts match those filters</p>
              <p className="mt-2 text-sm text-muted-foreground">Try widening your price or rating.</p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
