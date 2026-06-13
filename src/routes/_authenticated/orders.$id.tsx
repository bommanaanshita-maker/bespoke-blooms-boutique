import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check, Circle, RotateCw, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/_authenticated/orders/$id")({
  head: () => ({ meta: [{ title: "Order details — gifted." }] }),
  component: OrderDetail,
});

const STAGES = [
  { key: "placed", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "preparing", label: "Preparing" },
  { key: "customized", label: "Customized" },
  { key: "packed", label: "Packed" },
  { key: "shipped", label: "Shipped" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

function OrderDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const add = useCart((s) => s.add);
  const [reordering, setReordering] = useState(false);

  const q = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const { data: order, error } = await supabase
        .from("orders")
        .select("*, order_items(*), order_status_history(status, note, created_at)")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      if (!order) throw notFound();
      return order;
    },
  });

  if (q.isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <p className="mx-auto max-w-3xl px-5 py-20 text-center text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }
  if (!q.data) return null;
  const o = q.data;
  const currentIdx = Math.max(0, STAGES.findIndex((s) => s.key === o.status));
  const progress = ((currentIdx + 1) / STAGES.length) * 100;

  const reorder = async () => {
    setReordering(true);
    for (const it of o.order_items ?? []) {
      add({
        productId: it.product_id,
        name: it.name,
        price: Number(it.price),
        image: it.image,
        qty: it.qty,
        customization: (it.customization as Record<string, string>) ?? {},
      });
    }
    setReordering(false);
    toast.success("Items added to cart");
    navigate({ to: "/cart" });
  };

  const itemsSubtotal = (o.order_items ?? []).reduce((s, i) => s + Number(i.price) * i.qty, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <Link to="/orders" className="text-xs text-muted-foreground hover:text-foreground">← Back to orders</Link>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Order</p>
            <h1 className="mt-1 font-display text-4xl">{o.order_number}</h1>
            <p className="text-xs text-muted-foreground">
              Placed {new Date(o.created_at).toLocaleString("en-IN")}
            </p>
          </div>
          <button
            onClick={reorder}
            disabled={reordering}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-card hover:opacity-95 disabled:opacity-60"
          >
            {reordering ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCw className="h-4 w-4" />}
            Order again
          </button>
        </div>

        <div className="mt-8 rounded-3xl bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-center justify-between text-sm">
            <h2 className="font-display text-xl">Tracking</h2>
            {o.delivery_date && (
              <p className="text-xs text-muted-foreground">
                Est. delivery {new Date(o.delivery_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            )}
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-blush-gradient transition-all" style={{ width: `${progress}%` }} />
          </div>
          <ol className="mt-7 space-y-4">
            {STAGES.map((s, i) => {
              const reached = i <= currentIdx;
              const histEntry = (o.order_status_history ?? []).find((h) => h.status === s.key);
              return (
                <li key={s.key} className="flex items-start gap-3">
                  <span className={`mt-0.5 grid h-6 w-6 place-items-center rounded-full ${reached ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {reached ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-2 w-2" />}
                  </span>
                  <div className="flex-1">
                    <p className={`text-sm ${reached ? "font-medium" : "text-muted-foreground"}`}>{s.label}</p>
                    {histEntry && (
                      <p className="text-xs text-muted-foreground">
                        {new Date(histEntry.created_at).toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-card p-6 shadow-soft sm:p-8">
              <h2 className="font-display text-xl">Items</h2>
              <ul className="mt-4 divide-y divide-border/60">
                {(o.order_items ?? []).map((it) => (
                  <li key={it.id} className="flex gap-4 py-4">
                    <img src={it.image} alt="" className="h-20 w-20 flex-none rounded-2xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-lg">{it.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {it.qty}</p>
                      {it.customization && Object.keys(it.customization as object).length > 0 && (
                        <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                          {Object.entries(it.customization as Record<string, string>)
                            .filter(([, v]) => v)
                            .map(([k, v]) => (
                              <li key={k}><span className="capitalize">{k}:</span> {String(v)}</li>
                            ))}
                        </ul>
                      )}
                    </div>
                    <p className="font-display text-lg">₹{(Number(it.price) * it.qty).toLocaleString("en-IN")}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-card p-6 shadow-soft sm:p-8">
              <h2 className="font-display text-xl">Shipping address</h2>
              <p className="mt-3 text-sm">{o.ship_name} · {o.ship_phone}</p>
              <p className="text-sm text-muted-foreground">{o.ship_email}</p>
              <p className="mt-2 text-sm">
                {o.ship_line1}{o.ship_line2 ? `, ${o.ship_line2}` : ""}<br />
                {o.ship_city}, {o.ship_state} {o.ship_pincode}
              </p>
              {o.gift_message && (
                <div className="mt-4 rounded-2xl bg-blush/20 p-4 text-sm italic">
                  "{o.gift_message}"
                </div>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-3xl bg-muted/50 p-6 shadow-soft">
            <h2 className="font-display text-xl">Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Items">₹{itemsSubtotal.toLocaleString("en-IN")}</Row>
              <Row label="Subtotal">₹{Number(o.subtotal).toLocaleString("en-IN")}</Row>
              <Row label="Shipping">{Number(o.shipping) === 0 ? "Free" : `₹${o.shipping}`}</Row>
              <Row label="Payment">{o.payment_method.toUpperCase()}</Row>
              <div className="flex justify-between border-t border-border/60 pt-3 text-base">
                <dt className="font-medium">Total</dt>
                <dd className="font-display text-2xl">₹{Number(o.total).toLocaleString("en-IN")}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
