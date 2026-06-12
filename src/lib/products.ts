import mug from "@/assets/product-mug.jpg";
import hamper from "@/assets/product-hamper.jpg";
import card from "@/assets/product-card.jpg";
import frame from "@/assets/product-frame.jpg";
import flowers from "@/assets/product-flowers.jpg";
import teddy from "@/assets/product-teddy.jpg";
import candle from "@/assets/product-candle.jpg";

export type CustomizationField =
  | { kind: "text"; key: string; label: string; placeholder?: string; max?: number }
  | { kind: "message"; key: string; label: string }
  | { kind: "image"; key: string; label: string }
  | { kind: "select"; key: string; label: string; options: string[] }
  | { kind: "number"; key: string; label: string; min?: number; max?: number };

export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  occasion: string[];
  type: string;
  image: string;
  gallery?: string[];
  description: string;
  customization: CustomizationField[];
  badge?: string;
};

export const categories = [
  { slug: "birthday", name: "Birthday Gifts", emoji: "🎂", tint: "blush" },
  { slug: "anniversary", name: "Anniversary", emoji: "💞", tint: "lavender" },
  { slug: "kids", name: "Kids Gifts", emoji: "🧸", tint: "cream" },
  { slug: "baby", name: "Baby Gifts", emoji: "🍼", tint: "blush" },
  { slug: "cards", name: "Greeting Cards", emoji: "💌", tint: "lavender" },
  { slug: "hampers", name: "Custom Hampers", emoji: "🧺", tint: "cream" },
  { slug: "wedding", name: "Wedding Gifts", emoji: "💍", tint: "blush" },
  { slug: "corporate", name: "Corporate", emoji: "🎁", tint: "lavender" },
  { slug: "festival", name: "Festival", emoji: "✨", tint: "cream" },
];

export const products: Product[] = [
  {
    id: "blush-bloom-bouquet",
    name: "Blush Bloom Bouquet",
    price: 1499,
    rating: 4.9,
    reviews: 312,
    category: "anniversary",
    occasion: ["Anniversary", "Birthday", "Wedding"],
    type: "Flowers",
    image: flowers,
    description:
      "A breathtaking arrangement of soft pink roses and ivory peonies, hand-tied in cream paper with a silk ribbon.",
    customization: [
      { kind: "message", key: "message", label: "Personal message" },
      { kind: "select", key: "wrap", label: "Wrap color", options: ["Cream", "Blush", "Lavender"] },
    ],
    badge: "Best Seller",
  },
  {
    id: "personalised-floral-mug",
    name: "Personalised Floral Mug",
    price: 499,
    rating: 4.8,
    reviews: 528,
    category: "birthday",
    occasion: ["Birthday", "Festival"],
    type: "Mug",
    image: mug,
    description:
      "A delicate ceramic mug printed with a watercolour bloom and the name of your choice. Dishwasher safe.",
    customization: [
      { kind: "text", key: "name", label: "Name to print", max: 14, placeholder: "e.g. Aanya" },
      { kind: "message", key: "message", label: "Tiny message (optional)" },
      { kind: "select", key: "font", label: "Font style", options: ["Script", "Serif", "Modern"] },
    ],
  },
  {
    id: "luxe-celebration-hamper",
    name: "Luxe Celebration Hamper",
    price: 2899,
    rating: 4.9,
    reviews: 184,
    category: "hampers",
    occasion: ["Anniversary", "Festival", "Corporate"],
    type: "Hamper",
    image: hamper,
    description:
      "Belgian chocolates, a soy candle, a hand-tied dried bloom and a personal card — wrapped in a woven basket.",
    customization: [
      { kind: "select", key: "chocolate", label: "Chocolate", options: ["Dark", "Milk", "Mixed"] },
      { kind: "select", key: "candle", label: "Candle scent", options: ["Rose", "Vanilla", "Oud"] },
      { kind: "message", key: "message", label: "Card message" },
    ],
    badge: "New",
  },
  {
    id: "gold-foil-greeting-card",
    name: "Gold Foil Greeting Card",
    price: 199,
    rating: 4.7,
    reviews: 902,
    category: "cards",
    occasion: ["Birthday", "Anniversary", "Wedding"],
    type: "Card",
    image: card,
    description:
      "Hand-pressed blush cardstock with gold foil lettering. Personalise the recipient's name and message.",
    customization: [
      { kind: "text", key: "recipient", label: "Recipient name", max: 24 },
      { kind: "message", key: "message", label: "Inside message" },
      { kind: "select", key: "font", label: "Font", options: ["Script", "Serif", "Modern"] },
    ],
  },
  {
    id: "lavender-photo-frame",
    name: "Lavender Photo Frame",
    price: 899,
    rating: 4.8,
    reviews: 241,
    category: "anniversary",
    occasion: ["Anniversary", "Wedding"],
    type: "Frame",
    image: frame,
    description:
      "A warm wooden frame tied with a lavender ribbon — perfect for a memory you'll keep on the mantelpiece.",
    customization: [
      { kind: "image", key: "photo", label: "Upload your photo" },
      { kind: "text", key: "quote", label: "Engraved quote", max: 40 },
    ],
  },
  {
    id: "cuddle-cream-teddy",
    name: "Cuddle Cream Teddy",
    price: 799,
    rating: 4.9,
    reviews: 416,
    category: "kids",
    occasion: ["Baby", "Birthday"],
    type: "Toy",
    image: teddy,
    description:
      "A buttery-soft cream teddy with a satin pink bow — the kind of friend you'll want to keep forever.",
    customization: [
      { kind: "text", key: "name", label: "Embroider name", max: 12 },
      { kind: "select", key: "bow", label: "Bow color", options: ["Pink", "Cream", "Lavender"] },
    ],
  },
  {
    id: "rose-petal-candle",
    name: "Rose Petal Candle",
    price: 1199,
    rating: 4.8,
    reviews: 167,
    category: "festival",
    occasion: ["Festival", "Anniversary", "Corporate"],
    type: "Candle",
    image: candle,
    description:
      "Hand-poured soy wax candle infused with damask rose and eucalyptus. 45 hours of soft, lingering scent.",
    customization: [
      { kind: "select", key: "scent", label: "Scent", options: ["Rose", "Eucalyptus", "Sandalwood"] },
      { kind: "text", key: "label", label: "Custom label", max: 18 },
    ],
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
