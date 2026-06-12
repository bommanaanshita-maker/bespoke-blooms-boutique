import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tintBg: Record<string, string> = {
  blush: "bg-blush/40",
  lavender: "bg-lavender/50",
  cream: "bg-cream",
};

export function CategoryCard({
  slug,
  name,
  emoji,
  tint,
  index = 0,
}: {
  slug: string;
  name: string;
  emoji: string;
  tint: string;
  index?: number;
}) {
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
        <span className="text-4xl transition-transform duration-500 ease-out group-hover:scale-110">
          {emoji}
        </span>
        <span className="font-display text-sm leading-tight text-foreground">{name}</span>
      </Link>
    </motion.div>
  );
}
