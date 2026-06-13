import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { b as useCart, u as useAuth, c as cartTotal, N as Navbar } from "./Navbar-FQbSlWmj.mjs";
import { F as Footer } from "./Footer-DuM0UnWI.mjs";
import { supabase } from "./client-pPoEERrW.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { m as Plus, W as Wallet, r as CreditCard, s as Landmark, i as Truck, f as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/zustand.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
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
const methods = [{
  id: "upi",
  label: "UPI",
  Icon: Wallet
}, {
  id: "card",
  label: "Credit / Debit",
  Icon: CreditCard
}, {
  id: "netbanking",
  label: "Net banking",
  Icon: Landmark
}, {
  id: "cod",
  label: "Cash on delivery",
  Icon: Truck
}];
function Checkout() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const subtotal = cartTotal(items);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;
  const [method, setMethod] = reactExports.useState("upi");
  const [loading, setLoading] = reactExports.useState(false);
  const [selectedAddressId, setSelectedAddressId] = reactExports.useState(null);
  const [showNewAddress, setShowNewAddress] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    date: "",
    giftMessage: ""
  });
  const {
    data: addresses = [],
    isLoading: addressesLoading
  } = useQuery({
    queryKey: ["addresses", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("addresses").select("*").order("is_default", {
        ascending: false
      }).order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data || [];
    }
  });
  reactExports.useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((a) => a.is_default);
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
        giftMessage: ""
      });
    }
  }, [addresses, selectedAddressId]);
  const handleAddressSelect = (address) => {
    setSelectedAddressId(address.id);
    setShowNewAddress(false);
    setFormData({
      ...formData,
      name: address.name,
      phone: address.phone,
      address: address.line1,
      city: address.city,
      state: address.state,
      pincode: address.pincode
    });
  };
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const {
      data: order,
      error
    } = await supabase.from("orders").insert({
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
      ship_pincode: formData.pincode
    }).select("id").single();
    if (error || !order) {
      setLoading(false);
      toast.error(error?.message || "Could not place order");
      return;
    }
    const {
      error: itemsErr
    } = await supabase.from("order_items").insert(items.map((i) => ({
      order_id: order.id,
      product_id: i.productId,
      name: i.name,
      image: i.image,
      price: i.price,
      qty: i.qty,
      customization: i.customization ?? {}
    })));
    setLoading(false);
    if (itemsErr) {
      toast.error(itemsErr.message);
      return;
    }
    clear();
    toast.success("Order placed!");
    navigate({
      to: "/orders/$id",
      params: {
        id: order.id
      }
    });
  };
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-5 py-32 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Nothing to check out" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-6 inline-block text-sm text-primary underline", children: "Browse gifts" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-5 py-12 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl leading-tight sm:text-5xl", children: "Almost there." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-10 grid gap-10 lg:grid-cols-[1fr_360px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
          !addressesLoading && addresses.length > 0 && !showNewAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card p-6 shadow-soft sm:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Saved addresses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-3 sm:grid-cols-2", children: addresses.map((addr) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: cn("flex items-start gap-3 rounded-2xl border border-border bg-background p-4 cursor-pointer transition-soft hover:border-primary", selectedAddressId === addr.id && "border-primary bg-blush/20"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "address-select", value: addr.id, checked: selectedAddressId === addr.id, onChange: () => handleAddressSelect(addr), className: "mt-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase text-muted-foreground", children: addr.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-medium", children: addr.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: addr.phone }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm", children: [
                  addr.line1,
                  addr.line2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    ", ",
                    addr.line2
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  addr.city,
                  ", ",
                  addr.state,
                  " ",
                  addr.pincode
                ] }),
                addr.is_default && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[11px] font-medium text-primary", children: "Default address" })
              ] })
            ] }, addr.id)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setShowNewAddress(true), className: "mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              " Use a new address"
            ] })
          ] }),
          (addresses.length === 0 || showNewAddress) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card p-6 shadow-soft sm:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Shipping details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-3 sm:grid-cols-2", children: [
              [["name", "Full name", "text"], ["phone", "Phone", "tel"], ["email", "Email", "email"], ["pincode", "Pincode", "text"]].map(([n, l, t]) => /* @__PURE__ */ jsxRuntimeExports.jsx(InputControlled, { name: n, label: l, type: t, value: formData[n], onChange: (v) => handleFormChange(n, v), required: true }, n)),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputControlled, { name: "address", label: "Address", value: formData.address, onChange: (v) => handleFormChange("address", v), required: true }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputControlled, { name: "city", label: "City", value: formData.city, onChange: (v) => handleFormChange("city", v), required: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputControlled, { name: "state", label: "State", value: formData.state, onChange: (v) => handleFormChange("state", v), required: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputControlled, { name: "date", label: "Delivery date", type: "date", value: formData.date, onChange: (v) => handleFormChange("date", v) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputControlled, { name: "giftMessage", label: "Gift message (optional)", value: formData.giftMessage, onChange: (v) => handleFormChange("giftMessage", v) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card p-6 shadow-soft sm:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Payment method" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-3 sm:grid-cols-2", children: methods.map((m) => {
              const on = method === m.id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setMethod(m.id), className: cn("flex items-center gap-3 rounded-2xl border border-border bg-background p-4 text-left transition-soft hover:border-primary", on && "border-primary bg-blush/20"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(m.Icon, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: m.label })
              ] }, m.id);
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "h-fit space-y-5 rounded-3xl bg-muted/50 p-6 shadow-soft lg:sticky lg:top-24", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 text-sm", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: i.image, alt: "", width: 44, height: 44, className: "h-11 w-11 rounded-lg object-cover", loading: "lazy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 truncate", children: [
              i.name,
              " × ",
              i.qty
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              (i.price * i.qty).toLocaleString("en-IN")
            ] })
          ] }, i.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "space-y-2 border-t border-border/60 pt-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { children: [
                "₹",
                subtotal.toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Shipping" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: shipping === 0 ? "Free" : `₹${shipping}` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-t border-border/60 pt-3 text-base", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-medium", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "font-display text-2xl", children: [
                "₹",
                total.toLocaleString("en-IN")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95 disabled:opacity-60", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Place order" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function InputControlled({
  name,
  label,
  type = "text",
  required,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-xs font-medium text-foreground/80", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name, type, required, value, onChange: (e) => onChange(e.target.value), className: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" })
  ] });
}
export {
  Checkout as component
};
