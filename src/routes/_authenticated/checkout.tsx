import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CreditCard, Landmark, Wallet, Truck, Loader2, MapPin, Plus } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
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
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    date: "",
    giftMessage: "",
  });

  // Fetch saved addresses
  const { data: addresses = [], isLoading: addressesLoading } = useQuery({
    queryKey: ["addresses", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // Auto-select default address on load
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((a: any) => a.is_default);
      const addrToSelect = defaultAddr || addresses[0];
      setSelectedAddressId(addrToSelect.id);
      setFormData({
        name: addrToSelect.name,
        phone: addrToSelect.phone,
        email: formData.email,
        address: addrToSelect.line1,
        city: addrToSelect.city,
        state: addrToSelect.state,
        pincode: addrToSelect.pincode,
        date: "",
        giftMessage: "",
      });
    }
  }, [addresses, selectedAddressId]);

  const handleAddressSelect = (address: any) => {
    setSelectedAddressId(address.id);
    setShowNewAddress(false);
    setFormData({
      ...formData,
      name: address.name,
      phone: address.phone,
      address: address.line1,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    });
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        subtotal,
        shipping,
        total,
        payment_method: method,
        gift_message: formData.giftMessage || null,
        delivery_date: formData.date || null,
        ship_name: formData.name,
        ship_phone: formData.phone,
        ship_email: formData.email,
        ship_line1: formData.address,
        ship_city: formData.city,
        ship_state: formData.state,
        ship_pincode: formData.pincode,
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
            {/* Saved Addresses Section */}
            {!addressesLoading && addresses.length > 0 && !showNewAddress && (
              <div className="rounded-3xl bg-card p-6 shadow-soft sm:p-8">
                <h2 className="font-display text-xl">Saved addresses</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {addresses.map((addr: any) => (
                    <label
                      key={addr.id}
                      className={cn(
                        "flex items-start gap-3 rounded-2xl border border-border bg-background p-4 cursor-pointer transition-soft hover:border-primary",
                        selectedAddressId === addr.id && "border-primary bg-blush/20",
                      )}
                    >
                      <input
                        type="radio"
                        name="address-select"
                        value={addr.id}
                        checked={selectedAddressId === addr.id}
                        onChange={() => handleAddressSelect(addr)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="text-xs font-medium uppercase text-muted-foreground">{addr.label}</p>
                        <p className="mt-1 font-medium">{addr.name}</p>
                        <p className="text-sm text-muted-foreground">{addr.phone}</p>
                        <p className="mt-1 text-sm">
                          {addr.line1}
                          {addr.line2 && <>, {addr.line2}</>}
                          <br />
                          {addr.city}, {addr.state} {addr.pincode}
                        </p>
                        {addr.is_default && (
                          <p className="mt-2 text-[11px] font-medium text-primary">Default address</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowNewAddress(true)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  <Plus className="h-4 w-4" /> Use a new address
                </button>
              </div>
            )}

            {/* Shipping Details Form */}
            {(addresses.length === 0 || showNewAddress) && (
              <div className="rounded-3xl bg-card p-6 shadow-soft sm:p-8">
                <h2 className="font-display text-xl">Shipping details</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["name", "Full name", "text", "text", "[A-Za-z\\s]+", "Name should only contain letters and spaces"],
                    ["phone", "Phone", "tel", "tel", "[0-9]{10}", "Phone number must be exactly 10 digits"],
                    ["email", "Email", "email", "email", "", ""],
                    ["pincode", "Pincode", "text", "text", "[0-9]{6}", "Pincode must be exactly 6 digits"],
                  ].map(([n, l, t, inputType, pattern, title]) => (
                    <InputControlled
                      key={n}
                      name={n}
                      label={l}
                      type={inputType as string}
                      value={formData[n as keyof typeof formData]}
                      onChange={(v) => handleFormChange(n, v)}
                      required
                      pattern={pattern || undefined}
                      title={title || undefined}
                      maxLength={n === "phone" ? 10 : n === "pincode" ? 6 : undefined}
                    />
                  ))}
                  <div className="sm:col-span-2">
                    <InputControlled
                      name="address"
                      label="Address"
                      value={formData.address}
                      onChange={(v) => handleFormChange("address", v)}
                      required
                    />
                  </div>
                  <InputControlled
                    name="city"
                    label="City"
                    value={formData.city}
                    onChange={(v) => handleFormChange("city", v)}
                    required
                    pattern="[A-Za-z\s]+"
                    title="City should only contain letters and spaces"
                  />
                  <InputControlled
                    name="state"
                    label="State"
                    value={formData.state}
                    onChange={(v) => handleFormChange("state", v)}
                    required
                    pattern="[A-Za-z\s]+"
                    title="State should only contain letters and spaces"
                  />
                  <InputControlled
                    name="date"
                    label="Delivery date"
                    type="date"
                    value={formData.date}
                    onChange={(v) => handleFormChange("date", v)}
                  />
                  <InputControlled
                    name="giftMessage"
                    label="Gift message (optional)"
                    value={formData.giftMessage}
                    onChange={(v) => handleFormChange("giftMessage", v)}
                  />
                </div>
              </div>
            )}

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
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Place order"}
            </button>
          </aside>
        </form>
      </section>
      <Footer />
    </div>
  );
}

function InputControlled({
  name,
  label,
  type = "text",
  required,
  value,
  onChange,
  pattern,
  title,
  maxLength,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  pattern?: string;
  title?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground/80">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        pattern={pattern}
        title={title}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
      />
    </label>
  );
}

function Input({
  name,
  label,
  type = "text",
  required,
  pattern,
  title,
  maxLength,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  pattern?: string;
  title?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground/80">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        pattern={pattern}
        title={title}
        maxLength={maxLength}
        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
      />
    </label>
  );
}
