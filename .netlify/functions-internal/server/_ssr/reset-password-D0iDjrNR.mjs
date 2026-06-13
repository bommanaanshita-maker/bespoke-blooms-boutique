import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { supabase } from "./client-pPoEERrW.mjs";
import { b as Sparkles, f as LoaderCircle } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const schema = objectType({
  password: stringType().min(8, "At least 8 characters").regex(/[A-Z]/, "Add an uppercase letter").regex(/[a-z]/, "Add a lowercase letter").regex(/[0-9]/, "Add a number"),
  confirm: stringType()
}).refine((d) => d.password === d.confirm, {
  path: ["confirm"],
  message: "Passwords don't match"
});
function Reset() {
  const nav = useNavigate();
  const [loading, setLoading] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  async function onSubmit(e) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      const errs = {};
      parsed.error.issues.forEach((i) => errs[String(i.path[0])] = i.message);
      setErrors(errs);
      return;
    }
    setLoading(true);
    const {
      error
    } = await supabase.auth.updateUser({
      password: parsed.data.password
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated. You're signed in.");
    nav({
      to: "/dashboard"
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-hero-gradient", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mb-8 flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-full bg-blush-gradient text-primary-foreground shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl tracking-tight", children: "gifted." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card p-7 shadow-lift sm:p-9", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl", children: "Set a new password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Choose something memorable but strong." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "mt-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "New password", name: "password", error: errors.password, hint: "8+ chars, with upper, lower, and number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Confirm password", name: "confirm", error: errors.confirm }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: loading, className: "inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95 disabled:opacity-60", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Update password" })
      ] })
    ] })
  ] }) });
}
function Field({
  label,
  name,
  error,
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-xs font-medium text-foreground/80", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name, type: "password", className: `w-full rounded-2xl border bg-background px-4 py-3 text-sm focus:outline-none ${error ? "border-destructive" : "border-border focus:border-primary"}` }),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-xs text-destructive", children: error }) : hint ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-xs text-muted-foreground", children: hint }) : null
  ] });
}
export {
  Reset as component
};
