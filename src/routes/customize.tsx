import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Gift } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customize")({
  head: () => ({
    meta: [
      { title: "Custom gift builder — gifted." },
      { name: "description", content: "Build the perfect gift step by step." },
    ],
  }),
  component: Customize,
});

const occasions = ["Birthday", "Anniversary", "Baby Shower", "Wedding", "Festival"];
const wraps = [
  { id: "blush", name: "Blush silk", price: 149 },
  { id: "cream", name: "Cream ribbon", price: 99 },
  { id: "lavender", name: "Lavender bow", price: 129 },
];

const steps = ["Occasion", "Items", "Message", "Wrap", "Preview"] as const;

function Customize() {
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState<string>("");
  const [picked, setPicked] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [wrap, setWrap] = useState(wraps[0].id);
  const add = useCart((s) => s.add);
  const navigate = useNavigate();

  const togglePick = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const itemTotal = picked.reduce((sum, id) => {
    const p = products.find((x) => x.id === id);
    return sum + (p?.price ?? 0);
  }, 0);
  const wrapPrice = wraps.find((w) => w.id === wrap)?.price ?? 0;
  const total = itemTotal + wrapPrice;

  const canNext =
    (step === 0 && !!occasion) ||
    (step === 1 && picked.length > 0) ||
    (step === 2 && message.trim().length > 0) ||
    step === 3 ||
    step === 4;

  const checkout = () => {
    picked.forEach((id) => {
      const p = products.find((x) => x.id === id);
      if (p) {
        add({
          productId: p.id,
          name: p.name,
          price: p.price,
          image: p.image,
          qty: 1,
          customization: { occasion, message, wrap },
        });
      }
    });
    toast.success("Custom hamper added to cart");
    navigate({ to: "/cart" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-hero-gradient">
        <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Custom builder</p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
            Design a gift, step by step.
          </h1>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">
            Choose the occasion, pick the items, add a message — we'll wrap and ship it beautifully.
          </p>

          <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2">
            {steps.map((s, i) => (
              <div key={s} className="flex shrink-0 items-center gap-2">
                <div
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-full border text-xs transition-soft",
                    i <= step
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground",
                  )}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className={cn("text-xs", i === step ? "font-medium text-foreground" : "text-muted-foreground")}>
                  {s}
                </span>
                {i < steps.length - 1 && <span className="mx-1 h-px w-6 bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-5 py-12 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="rounded-3xl bg-card p-8 shadow-soft">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <>
                  <h2 className="font-display text-2xl">What's the occasion?</h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {occasions.map((o) => (
                      <button
                        key={o}
                        onClick={() => setOccasion(o)}
                        className={cn(
                          "rounded-2xl border border-border bg-background p-5 text-left transition-soft hover:border-primary",
                          occasion === o && "border-primary bg-blush/30",
                        )}
                      >
                        <span className="font-display text-lg">{o}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h2 className="font-display text-2xl">Pick your items</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Add as many as you like.</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {products.map((p) => {
                      const on = picked.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          onClick={() => togglePick(p.id)}
                          className={cn(
                            "flex items-center gap-4 rounded-2xl border border-border bg-background p-3 text-left transition-soft hover:border-primary",
                            on && "border-primary bg-blush/20",
                          )}
                        >
                          <img src={p.image} alt="" width={80} height={80} className="h-20 w-20 rounded-xl object-cover" loading="lazy" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-display text-base">{p.name}</p>
                            <p className="text-xs text-muted-foreground">{p.type}</p>
                            <p className="mt-1 text-sm font-medium">₹{p.price.toLocaleString("en-IN")}</p>
                          </div>
                          <div
                            className={cn(
                              "grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border",
                              on && "border-primary bg-primary text-primary-foreground",
                            )}
                          >
                            {on && <Check className="h-3.5 w-3.5" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="font-display text-2xl">Add your message</h2>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={240}
                    placeholder="Something they'll keep forever…"
                    className="mt-6 w-full resize-none rounded-2xl border border-border bg-background p-4 text-sm focus:border-primary focus:outline-none"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">{message.length}/240</p>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="font-display text-2xl">Choose your wrap</h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {wraps.map((w) => (
                      <button
                        key={w.id}
                        onClick={() => setWrap(w.id)}
                        className={cn(
                          "rounded-2xl border border-border bg-background p-5 text-left transition-soft hover:border-primary",
                          wrap === w.id && "border-primary bg-blush/30",
                        )}
                      >
                        <p className="font-display text-base">{w.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">+ ₹{w.price}</p>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h2 className="font-display text-2xl">Your custom gift</h2>
                  <div className="mt-6 rounded-2xl bg-blush/30 p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">For</p>
                    <p className="mt-1 font-display text-xl">{occasion}</p>
                    {message && (
                      <p className="mt-3 border-t border-border/60 pt-3 text-sm italic">"{message}"</p>
                    )}
                  </div>
                  <ul className="mt-5 space-y-3">
                    {picked.map((id) => {
                      const p = products.find((x) => x.id === id);
                      if (!p) return null;
                      return (
                        <li key={id} className="flex items-center gap-3 text-sm">
                          <img src={p.image} alt="" width={48} height={48} className="h-12 w-12 rounded-lg object-cover" loading="lazy" />
                          <span className="flex-1">{p.name}</span>
                          <span className="font-medium">₹{p.price.toLocaleString("en-IN")}</span>
                        </li>
                      );
                    })}
                    <li className="flex items-center gap-3 text-sm">
                      <span className="grid h-12 w-12 place-items-center rounded-lg bg-cream">
                        <Gift className="h-5 w-5 text-primary" />
                      </span>
                      <span className="flex-1">{wraps.find((w) => w.id === wrap)?.name} wrap</span>
                      <span className="font-medium">₹{wrapPrice}</span>
                    </li>
                  </ul>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between border-t border-border/60 pt-6">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-foreground/70 transition-soft hover:bg-muted disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-soft hover:opacity-95 disabled:opacity-40"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={checkout}
                disabled={picked.length === 0}
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-soft hover:opacity-90 disabled:opacity-40"
              >
                Add to cart
              </button>
            )}
          </div>
        </div>

        <aside className="h-fit rounded-3xl bg-muted/50 p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your gift</p>
          <h3 className="mt-1 font-display text-xl">{occasion || "Build a gift"}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {picked.length} item{picked.length !== 1 && "s"} · {wraps.find((w) => w.id === wrap)?.name}
          </p>
          <div className="mt-5 flex items-baseline justify-between border-t border-border/60 pt-4">
            <span className="text-sm">Subtotal</span>
            <span className="font-display text-2xl">₹{total.toLocaleString("en-IN")}</span>
          </div>
        </aside>
      </section>
      <Footer />
    </div>
  );
}
