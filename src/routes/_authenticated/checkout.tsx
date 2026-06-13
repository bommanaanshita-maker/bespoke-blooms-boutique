import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Landmark, Wallet, Truck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { cartTotal, useCart } from "@/lib/cart-store";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/checkout")({
  head: () => ({ meta: [{ title: "Checkout — gifted." }] }),
  component: Checkout,
});

const methods = [
  { id: "upi", label: "UPI", Icon: Wallet },
  { id: "card", label: "Credit / Debit", Icon: CreditCard },
  { id: "netbanking", label: "Net banking", Icon: Landmark },
  { id: "cod", label: "Cash on delivery", Icon: Truck },
];

function Checkout() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();
  const { user } = useAuth();
  const subtotal = cartTotal(items);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;
  const [method, setMethod] = useState("upi");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const fd = new FormData(e.currentTarget);
    const g = (k: string) => String(fd.get(k) ?? "").trim();
    setLoading(true);
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        subtotal,
        shipping,
        total,
        payment_method: method,
        gift_message: g("giftMessage") || null,
        delivery_date: g("date") || null,
        ship_name: g("name"),
        ship_phone: g("phone"),
        ship_email: g("email"),
        ship_line1: g("address"),
        ship_city: g("city"),
        ship_state: g("state"),
        ship_pincode: g("pincode"),
      })
      .select("id")
      .single();
    if (error || !order) {
      setLoading(false);
      toast.error(error?.message || "Could not place order");
      return;
    }
    const { error: itemsErr } = await supabase.from("order_items").insert(
      items.map((i) => ({
        order_id: order.id,
        product_id: i.productId,
        name: i.name,
        image: i.image,
        price: i.price,
        qty: i.qty,
        customization: i.customization ?? {},
      })),
    );
    setLoading(false);
    if (itemsErr) {
      toast.error(itemsErr.message);
      return;
    }
    clear();
    toast.success("Order placed!");
    navigate({ to: "/orders/$id", params: { id: order.id } });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-3xl px-5 py-32 text-center">
          <h1 className="font-display text-3xl">Nothing to check out</h1>
          <Link to="/shop" className="mt-6 inline-block text-sm text-primary underline">
            Browse gifts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Checkout</p>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">Almost there.</h1>

        <form onSubmit={submit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <div className="rounded-3xl bg-card p-6 shadow-soft sm:p-8">
              <h2 className="font-display text-xl">Shipping details</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["name", "Full name", "text"],
                  ["phone", "Phone", "tel"],
                  ["email", "Email", "email"],
                  ["pincode", "Pincode", "text"],
                ].map(([n, l, t]) => (
                  <Input key={n} name={n} label={l} type={t} required />
                ))}
                <div className="sm:col-span-2">
                  <Input name="address" label="Address" required />
                </div>
                <Input name="city" label="City" required />
                <Input name="state" label="State" required />
                <Input name="date" label="Delivery date" type="date" />
                <Input name="giftMessage" label="Gift message (optional)" />
              </div>
            </div>

            <div className="rounded-3xl bg-card p-6 shadow-soft sm:p-8">
              <h2 className="font-display text-xl">Payment method</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {methods.map((m) => {
                  const on = method === m.id;
                  return (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border border-border bg-background p-4 text-left transition-soft hover:border-primary",
                        on && "border-primary bg-blush/20",
                      )}
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-muted">
                        <m.Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="h-fit space-y-5 rounded-3xl bg-muted/50 p-6 shadow-soft lg:sticky lg:top-24">
            <h2 className="font-display text-xl">Summary</h2>
            <ul className="space-y-3 text-sm">
              {items.map((i) => (
                <li key={i.id} className="flex items-center gap-3">
                  <img src={i.image} alt="" width={44} height={44} className="h-11 w-11 rounded-lg object-cover" loading="lazy" />
                  <span className="flex-1 truncate">{i.name} × {i.qty}</span>
                  <span>₹{(i.price * i.qty).toLocaleString("en-IN")}</span>
                </li>
              ))}
            </ul>
            <dl className="space-y-2 border-t border-border/60 pt-4 text-sm">
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
            <button
              type="submit"
              className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95"
            >
              Place order
            </button>
          </aside>
        </form>
      </section>
      <Footer />
    </div>
  );
}

function Input({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground/80">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
      />
    </label>
  );
}
