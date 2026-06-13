import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Package } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/orders")({
  head: () => ({ meta: [{ title: "My orders — gifted." }] }),
  component: Orders,
});

const statusHue: Record<string, string> = {
  placed: "bg-blush/40 text-foreground",
  confirmed: "bg-lavender/40",
  preparing: "bg-lavender/40",
  customized: "bg-lavender/40",
  packed: "bg-cream",
  shipped: "bg-gold/30",
  out_for_delivery: "bg-gold/40",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-muted text-muted-foreground",
};

function Orders() {
  const q = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, order_number, status, total, payment_method, created_at, delivery_date, order_items(id, name, image, qty)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Orders</p>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">My orders</h1>

        {q.isLoading ? (
          <p className="mt-10 text-sm text-muted-foreground">Loading…</p>
        ) : (q.data ?? []).length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-border bg-card p-16 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-muted">
              <Package className="h-5 w-5" />
            </span>
            <p className="mt-5 font-display text-2xl">No orders yet</p>
            <Link to="/shop" className="mt-4 inline-block text-sm text-primary underline">
              Start shopping
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {q.data!.map((o) => (
              <li key={o.id} className="rounded-3xl bg-card p-5 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <Link to="/orders/$id" params={{ id: o.id }} className="font-display text-lg hover:underline">
                      {o.order_number}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      Placed {new Date(o.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      {o.delivery_date && ` · Delivery ${new Date(o.delivery_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-[11px] font-medium capitalize ${statusHue[o.status] ?? "bg-muted"}`}>
                      {o.status.replace("_", " ")}
                    </span>
                    <span className="font-display text-xl">₹{Number(o.total).toLocaleString("en-IN")}</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {(o.order_items ?? []).slice(0, 4).map((it) => (
                    <div key={it.id} className="flex items-center gap-2 rounded-full bg-muted/60 py-1 pl-1 pr-3 text-xs">
                      <img src={it.image} alt="" className="h-7 w-7 rounded-full object-cover" />
                      <span className="truncate max-w-[160px]">{it.name} × {it.qty}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <Link
                    to="/orders/$id"
                    params={{ id: o.id }}
                    className="rounded-full border border-border bg-background px-4 py-2 text-xs font-medium transition-soft hover:bg-muted"
                  >
                    View details
                  </Link>
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
