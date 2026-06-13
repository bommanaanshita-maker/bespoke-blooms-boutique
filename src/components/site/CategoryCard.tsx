import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

const tintBg: Record<string, string> = {
  blush: "bg-blush/40",
  lavender: "bg-lavender/50",
  cream: "bg-cream",
};

export function CategoryCard({
  slug,
  name,
  icon,
  tint,
  index = 0,
}: {
  slug: string;
  name: string;
  icon: string;
  tint: string;
  index?: number;
}) {
  const IconComponent = (Icons as Record<string, any>)[icon] || Icons.Package;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3) }}
    >
      <Link
        to="/shop"
        search={{ category: slug }}
        className={cn(
          "group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl p-6 text-center shadow-soft transition-soft hover-lift",
          tintBg[tint] ?? "bg-muted",
        )}
      >
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/50 transition-transform duration-500 ease-out group-hover:scale-110">
          <IconComponent className="h-8 w-8 text-foreground" strokeWidth={1.5} />
        </div>
        <span className="font-display text-sm leading-tight text-foreground">{name}</span>
      </Link>
    </motion.div>
  );
}
