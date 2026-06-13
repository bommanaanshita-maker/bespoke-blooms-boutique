import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Gift, Heart, ShieldCheck, Sparkles, Truck, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { CategoryCard } from "@/components/site/CategoryCard";
import { categories, products } from "@/lib/products";
import heroGift from "@/assets/hero-gift.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "gifted. — personalised gifts for every occasion" },
      {
        name: "description",
        content:
          "Hand-crafted, personalised gifts for birthdays, anniversaries, weddings and more. Customise, preview and ship with care.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Categories />
      <BestSellers />
      <WhyUs />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-hero-gradient" />
      <div className="absolute -left-24 top-20 -z-10 h-72 w-72 rounded-full bg-blush/40 blur-3xl" />
      <div className="absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-lavender/40 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-1.5 text-xs text-foreground/70 backdrop-blur">
            <Sparkles className="h-3 w-3 text-gold" />
            Personalised in 24 hours
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            Create memorable gifts
            <br />
            for every <em className="text-gold-gradient not-italic">occasion</em>.
          </h1>
          <p className="mt-6 max-w-lg text-base text-muted-foreground sm:text-lg">
            Personalised gifts crafted with love and delivered to their doorstep. Choose, customise, preview — done in minutes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95 hover:shadow-lift"
            >
              Shop now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/customize"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-soft hover:bg-background"
            >
              <Gift className="h-4 w-4" />
              Create custom gift
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="font-medium text-foreground">4.9</span>
              <span>· 12k reviews</span>
            </div>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="hidden sm:inline">Free shipping over ₹999</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-lift">
            <img
              src={heroGift}
              alt="Beautifully wrapped blush pink gift box with peonies and lavender"
              width={1536}
              height={1536}
              className="aspect-square w-full object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-background p-4 shadow-card sm:block"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-blush/60">
                <Heart className="h-4 w-4 text-primary" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Loved by</p>
                <p className="font-display text-base">120,000+ giftees</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="absolute -right-4 top-10 hidden rounded-2xl bg-background p-4 shadow-card sm:block"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-lavender/70">
                <Truck className="h-4 w-4 text-secondary-foreground" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Delivered in</p>
                <p className="font-display text-base">24–48 hours</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Categories</p>
          <h2 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
            Find the perfect gift
          </h2>
        </div>
        <Link
          to="/shop"
          className="hidden text-sm text-muted-foreground transition-soft hover:text-foreground sm:inline-flex"
        >
          Browse all →
        </Link>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.slice(0, 5).map((c, i) => (
          <CategoryCard key={c.slug} {...c} index={i} />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.slice(5).map((c, i) => (
          <CategoryCard key={c.slug} {...c} index={i} />
        ))}
      </div>
    </section>
  );
}

function BestSellers() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Best sellers</p>
          <h2 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
            Loved this season
          </h2>
        </div>
        <Link
          to="/shop"
          className="hidden text-sm text-muted-foreground transition-soft hover:text-foreground sm:inline-flex"
        >
          See all →
        </Link>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

const reasons = [
  { Icon: Heart, title: "Personalised gifts", body: "Names, messages, photos — make it truly theirs." },
  { Icon: Truck, title: "Fast delivery", body: "24–48 hours across major cities, gift-wrapped." },
  { Icon: Sparkles, title: "Premium quality", body: "Carefully sourced, hand-finished by our artisans." },
  { Icon: ShieldCheck, title: "Secure payments", body: "All major cards, UPI and net banking supported." },
];

function WhyUs() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="rounded-[2.5rem] bg-muted/60 p-10 sm:p-14">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Why gifted.</p>
        <h2 className="mt-2 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
          A thoughtful experience, from cart to doorstep.
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl bg-background p-6 shadow-soft"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-blush/50 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote:
      "The hamper arrived the next morning, beautifully wrapped. My mum cried — in the good way. I'll be back for every occasion.",
    name: "Ananya R.",
    where: "Mumbai",
  },
  {
    quote:
      "I designed a mug in literally three minutes and the preview was exactly what showed up. Quality felt premium.",
    name: "Karan S.",
    where: "Bengaluru",
  },
  {
    quote:
      "Custom builder is genius. I picked everything for our anniversary hamper and added a note. Got texts all week.",
    name: "Meher D.",
    where: "Delhi",
  },
];

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Loved notes</p>
      <h2 className="mt-2 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
        What giftees are saying.
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-3xl bg-card p-8 shadow-soft"
          >
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 font-display text-lg leading-snug">"{t.quote}"</blockquote>
            <figcaption className="mt-5 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{t.name}</span> · {t.where}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("You are subscribed! 🎁");
      setEmail("");
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-4 lg:px-8">
      <div className="overflow-hidden rounded-[2.5rem] bg-blush-gradient p-10 text-center text-primary-foreground sm:p-16">
        <h2 className="font-display text-3xl leading-tight sm:text-4xl">
          Get 10% off your first gift.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm opacity-90">
          Join the gifted. letter for new collections, seasonal ideas, and tiny moments of inspiration.
        </p>
        <form
          className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
          onSubmit={handleSubscribe}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 rounded-full bg-background/95 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-background"
          />
          <button className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-soft hover:opacity-90">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
