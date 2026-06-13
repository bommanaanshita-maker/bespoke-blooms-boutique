import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as Sparkles, A as ArrowRight, G as Gift, S as Star, H as Heart, i as Truck, j as ShieldCheck, k as Icons, P as Package } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { N as Navbar } from "./Navbar-FQbSlWmj.mjs";
import { F as Footer } from "./Footer-DuM0UnWI.mjs";
import { P as ProductCard } from "./ProductCard-CcRjjurh.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { c as categories, p as products } from "./router-DxlzPpTF.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/zustand.mjs";
import "./client-pPoEERrW.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/zod.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const tintBg = {
  blush: "bg-blush/40",
  lavender: "bg-lavender/50",
  cream: "bg-cream"
};
function CategoryCard({
  slug,
  name,
  icon,
  tint,
  index = 0
}) {
  const IconComponent = Icons[icon] || Package;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 14 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-40px" },
      transition: { duration: 0.5, delay: Math.min(index * 0.04, 0.3) },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/shop",
          search: { category: slug },
          className: cn(
            "group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl p-6 text-center shadow-soft transition-soft hover-lift",
            tintBg[tint] ?? "bg-muted"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center rounded-2xl bg-white/50 transition-transform duration-500 ease-out group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "h-8 w-8 text-foreground", strokeWidth: 1.5 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm leading-tight text-foreground", children: name })
          ]
        }
      )
    }
  );
}
const heroGift = "/assets/hero-gift-ClyfYA9h.jpg";
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Categories, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BestSellers, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhyUs, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Newsletter, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-hero-gradient" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-24 top-20 -z-10 h-72 w-72 rounded-full bg-blush/40 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-lavender/40 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-1.5 text-xs text-foreground/70 backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 text-gold" }),
          "Personalised in 24 hours"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 font-display text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl", children: [
          "Create memorable gifts",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "for every ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-gold-gradient not-italic", children: "occasion" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-lg text-base text-muted-foreground sm:text-lg", children: "Personalised gifts crafted with love and delivered to their doorstep. Choose, customise, preview — done in minutes." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95 hover:shadow-lift", children: [
            "Shop now",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/customize", className: "inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-soft hover:bg-background", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-4 w-4" }),
            "Create custom gift"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex items-center gap-6 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-gold text-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "4.9" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "· 12k reviews" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden h-3 w-px bg-border sm:block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Free shipping over ₹999" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        scale: 0.96
      }, animate: {
        opacity: 1,
        scale: 1
      }, transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1]
      }, className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden rounded-[2.5rem] shadow-lift", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroGift, alt: "Beautifully wrapped blush pink gift box with peonies and lavender", width: 1536, height: 1536, className: "aspect-square w-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.5,
          duration: 0.6
        }, className: "absolute -bottom-6 -left-6 hidden rounded-2xl bg-background p-4 shadow-card sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-full bg-blush/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Loved by" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base", children: "120,000+ giftees" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.7,
          duration: 0.6
        }, className: "absolute -right-4 top-10 hidden rounded-2xl bg-background p-4 shadow-card sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-full bg-lavender/70", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 text-secondary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Delivered in" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base", children: "24–48 hours" })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
function Categories() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-5 py-20 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Categories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl leading-tight sm:text-5xl", children: "Find the perfect gift" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hidden text-sm text-muted-foreground transition-soft hover:text-foreground sm:inline-flex", children: "Browse all →" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5", children: categories.slice(0, 5).map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryCard, { ...c, index: i }, c.slug)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4", children: categories.slice(5).map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryCard, { ...c, index: i }, c.slug)) })
  ] });
}
function BestSellers() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-5 py-16 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Best sellers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl leading-tight sm:text-5xl", children: "Loved this season" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hidden text-sm text-muted-foreground transition-soft hover:text-foreground sm:inline-flex", children: "See all →" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: products.slice(0, 4).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, index: i }, p.id)) })
  ] });
}
const reasons = [{
  Icon: Heart,
  title: "Personalised gifts",
  body: "Names, messages, photos — make it truly theirs."
}, {
  Icon: Truck,
  title: "Fast delivery",
  body: "24–48 hours across major cities, gift-wrapped."
}, {
  Icon: Sparkles,
  title: "Premium quality",
  body: "Carefully sourced, hand-finished by our artisans."
}, {
  Icon: ShieldCheck,
  title: "Secure payments",
  body: "All major cards, UPI and net banking supported."
}];
function WhyUs() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-5 py-20 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2.5rem] bg-muted/60 p-10 sm:p-14", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Why gifted." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 max-w-2xl font-display text-4xl leading-tight sm:text-5xl", children: "A thoughtful experience, from cart to doorstep." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: reasons.map(({
      Icon,
      title,
      body
    }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 14
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true,
      margin: "-40px"
    }, transition: {
      duration: 0.5,
      delay: i * 0.05
    }, className: "rounded-2xl bg-background p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-11 w-11 place-items-center rounded-full bg-blush/50 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-lg", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: body })
    ] }, title)) })
  ] }) });
}
const testimonials = [{
  quote: "The hamper arrived the next morning, beautifully wrapped. My mum cried — in the good way. I'll be back for every occasion.",
  name: "Ananya R.",
  where: "Mumbai"
}, {
  quote: "I designed a mug in literally three minutes and the preview was exactly what showed up. Quality felt premium.",
  name: "Karan S.",
  where: "Bengaluru"
}, {
  quote: "Custom builder is genius. I picked everything for our anniversary hamper and added a note. Got texts all week.",
  name: "Meher D.",
  where: "Delhi"
}];
function Testimonials() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-5 py-20 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Loved notes" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 max-w-2xl font-display text-4xl leading-tight sm:text-5xl", children: "What giftees are saying." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-6 md:grid-cols-3", children: testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.figure, { initial: {
      opacity: 0,
      y: 14
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true,
      margin: "-40px"
    }, transition: {
      duration: 0.5,
      delay: i * 0.06
    }, className: "rounded-3xl bg-card p-8 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 text-gold", children: Array.from({
        length: 5
      }).map((_, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-current" }, j)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "mt-4 font-display text-lg leading-snug", children: [
        '"',
        t.quote,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-5 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: t.name }),
        " · ",
        t.where
      ] })
    ] }, t.name)) })
  ] });
}
function Newsletter() {
  const [email, setEmail] = reactExports.useState("");
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("You are subscribed! 🎁");
      setEmail("");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-5 pb-16 pt-4 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-[2.5rem] bg-blush-gradient p-10 text-center text-primary-foreground sm:p-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl leading-tight sm:text-4xl", children: "Get 10% off your first gift." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-lg text-sm opacity-90", children: "Join the gifted. letter for new collections, seasonal ideas, and tiny moments of inspiration." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row", onSubmit: handleSubscribe, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@email.com", className: "flex-1 rounded-full bg-background/95 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-background" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-soft hover:opacity-90", children: "Subscribe" })
    ] })
  ] }) });
}
export {
  Home as component
};
