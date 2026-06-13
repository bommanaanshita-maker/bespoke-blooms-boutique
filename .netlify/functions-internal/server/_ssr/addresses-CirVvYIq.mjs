import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAuth, N as Navbar } from "./Navbar-FQbSlWmj.mjs";
import { F as Footer } from "./Footer-DuM0UnWI.mjs";
import { supabase } from "./client-pPoEERrW.mjs";
import { m as Plus, M as MapPin, S as Star, t as Pencil, o as Trash2, f as LoaderCircle } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/zustand.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
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
const empty = {
  label: "Home",
  name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  is_default: false
};
function Addresses() {
  const {
    user
  } = useAuth();
  const qc = useQueryClient();
  const [editing, setEditing] = reactExports.useState(null);
  const q = useQuery({
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
      return data;
    }
  });
  const save = useMutation({
    mutationFn: async (a) => {
      const payload = {
        ...a,
        user_id: user.id
      };
      if (a.id) {
        const {
          error
        } = await supabase.from("addresses").update(payload).eq("id", a.id);
        if (error) throw error;
      } else {
        const {
          error
        } = await supabase.from("addresses").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Address saved");
      qc.invalidateQueries({
        queryKey: ["addresses", user?.id]
      });
      setEditing(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const remove = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("addresses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["addresses", user?.id]
    })
  });
  const setDefault = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("addresses").update({
        is_default: true
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["addresses", user?.id]
    })
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-5xl px-5 py-12 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl leading-tight sm:text-5xl", children: "Saved addresses" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing(empty), className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-card hover:opacity-95", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " New address"
        ] })
      ] }),
      q.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-10 text-sm text-muted-foreground", children: "Loading…" }) : (q.data ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-3xl border border-dashed border-border bg-card p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-display text-xl", children: "No addresses saved" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 grid gap-4 sm:grid-cols-2", children: q.data.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-3xl bg-card p-5 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-muted px-3 py-1 text-[11px] font-medium", children: a.label }),
          a.is_default && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] font-medium text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-current" }),
            " Default"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-medium", children: a.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: a.phone }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm", children: [
          a.line1,
          a.line2 ? `, ${a.line2}` : "",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          a.city,
          ", ",
          a.state,
          " ",
          a.pincode
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2", children: [
          !a.is_default && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDefault.mutate(a.id), className: "rounded-full border border-border px-3 py-1.5 text-xs hover:bg-muted", children: "Set default" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(a), className: "grid h-8 w-8 place-items-center rounded-full border border-border hover:bg-muted", "aria-label": "Edit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove.mutate(a.id), className: "grid h-8 w-8 place-items-center rounded-full border border-border text-destructive hover:bg-muted", "aria-label": "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
        ] })
      ] }, a.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 grid place-items-center bg-black/40 p-4", onClick: () => setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onClick: (e) => e.stopPropagation(), onSubmit: (e) => {
      e.preventDefault();
      save.mutate(editing);
    }, className: "w-full max-w-lg space-y-3 rounded-3xl bg-background p-6 shadow-lift sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: editing.id ? "Edit address" : "New address" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Inp, { label: "Label", value: editing.label, onChange: (v) => setEditing({
          ...editing,
          label: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Inp, { label: "Full name", value: editing.name, onChange: (v) => setEditing({
          ...editing,
          name: v
        }), required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Inp, { label: "Phone", value: editing.phone, onChange: (v) => setEditing({
          ...editing,
          phone: v
        }), required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Inp, { label: "Pincode", value: editing.pincode, onChange: (v) => setEditing({
          ...editing,
          pincode: v
        }), required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Inp, { label: "Address line 1", value: editing.line1, onChange: (v) => setEditing({
          ...editing,
          line1: v
        }), required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Inp, { label: "Address line 2 (optional)", value: editing.line2 ?? "", onChange: (v) => setEditing({
          ...editing,
          line2: v
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Inp, { label: "City", value: editing.city, onChange: (v) => setEditing({
          ...editing,
          city: v
        }), required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Inp, { label: "State", value: editing.state, onChange: (v) => setEditing({
          ...editing,
          state: v
        }), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: editing.is_default ?? false, onChange: (e) => setEditing({
          ...editing,
          is_default: e.target.checked
        }) }),
        "Set as default"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setEditing(null), className: "rounded-full border border-border px-4 py-2 text-sm", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: save.isPending, className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-95 disabled:opacity-60", children: save.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Save" })
      ] })
    ] }) })
  ] });
}
function Inp({
  label,
  value,
  onChange,
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-xs font-medium text-foreground/80", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, required, onChange: (e) => onChange(e.target.value), className: "w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none" })
  ] });
}
export {
  Addresses as component
};
