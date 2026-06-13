import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/40">
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-10 px-5 py-16 lg:grid-cols-4 lg:px-8 [&>div:first-child]:col-span-3 lg:[&>div:first-child]:col-span-1">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-blush-gradient text-primary-foreground shadow-soft">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-display text-2xl tracking-tight">gifted.</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Hand-crafted, personalised gifts for the people you love. Delivered to their doorstep with care.
          </p>
          <div className="mt-5 flex gap-2">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
                className="grid h-9 w-9 place-items-center rounded-full bg-background text-foreground/70 shadow-soft transition-soft hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: "Shop", links: ["Birthday", "Anniversary", "Hampers", "Cards"] },
          { title: "Company", links: ["About", "Sustainability", "Careers", "Press"] },
          { title: "Support", links: ["Contact", "Shipping", "Returns", "FAQ"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-base">{col.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="transition-soft hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} gifted. — crafted with love.
      </div>
    </footer>
  );
}
