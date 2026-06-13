import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, e as useSearch, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { supabase } from "./client-pPoEERrW.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { b as Sparkles, E as EyeOff, h as Eye, f as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const registerSchema = objectType({
  fullName: stringType().trim().min(2, "Please enter your full name").max(80),
  email: stringType().trim().email("Enter a valid email").max(255),
  password: stringType().min(8, "At least 8 characters").regex(/[A-Z]/, "Add an uppercase letter").regex(/[a-z]/, "Add a lowercase letter").regex(/[0-9]/, "Add a number"),
  confirm: stringType()
}).refine((d) => d.password === d.confirm, {
  path: ["confirm"],
  message: "Passwords don't match"
});
const loginSchema = objectType({
  email: stringType().trim().email("Enter a valid email"),
  password: stringType().min(1, "Required")
});
function AuthPage() {
  const [tab, setTab] = reactExports.useState("login");
  const nav = useNavigate();
  const search = useSearch({
    from: "/auth"
  });
  const redirectTo = search.redirect || "/dashboard";
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({
      data
    }) => {
      if (data.session) nav({
        to: redirectTo
      });
    });
  }, [nav, redirectTo]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-hero-gradient", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mb-8 flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-full bg-blush-gradient text-primary-foreground shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl tracking-tight", children: "gifted." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card p-7 shadow-lift sm:p-9", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 grid grid-cols-2 gap-1 rounded-full bg-muted p-1", children: ["login", "register"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(t), className: cn("rounded-full py-2 text-sm font-medium transition-soft", tab === t ? "bg-background shadow-soft" : "text-muted-foreground"), children: t === "login" ? "Sign in" : "Create account" }, t)) }),
      tab === "login" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoginForm, { onSuccess: () => nav({
        to: redirectTo
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterForm, { onSuccess: () => setTab("login") })
    ] })
  ] }) });
}
function LoginForm({
  onSuccess
}) {
  const [show, setShow] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  async function onSubmit(e) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const parsed = loginSchema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      const errs = {};
      parsed.error.issues.forEach((i) => errs[String(i.path[0])] = i.message);
      setErrors(errs);
      return;
    }
    setLoading(true);
    const {
      error
    } = await supabase.auth.signInWithPassword(parsed.data);
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back!");
    onSuccess();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", name: "email", type: "email", error: errors.email, autoComplete: "email" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Password", name: "password", type: show ? "text" : "password", error: errors.password, autoComplete: "current-password", suffix: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow((v) => !v), className: "text-muted-foreground", children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "remember", type: "checkbox", defaultChecked: true, className: "h-3.5 w-3.5 rounded border-border" }),
        "Remember me"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forgot-password", className: "text-primary hover:underline", children: "Forgot password?" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: loading, className: "inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95 disabled:opacity-60", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Sign in" })
  ] });
}
function RegisterForm({
  onSuccess
}) {
  const [show, setShow] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  async function onSubmit(e) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const parsed = registerSchema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      const errs = {};
      parsed.error.issues.forEach((i) => errs[String(i.path[0])] = i.message);
      setErrors(errs);
      return;
    }
    setLoading(true);
    const {
      error
    } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          full_name: parsed.data.fullName
        }
      }
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created! Check your email to confirm, then sign in.");
    onSuccess();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", name: "fullName", error: errors.fullName, autoComplete: "name" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", name: "email", type: "email", error: errors.email, autoComplete: "email" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Password", name: "password", type: show ? "text" : "password", error: errors.password, autoComplete: "new-password", hint: "8+ chars, with upper, lower, and number", suffix: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow((v) => !v), className: "text-muted-foreground", children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Confirm password", name: "confirm", type: show ? "text" : "password", error: errors.confirm, autoComplete: "new-password" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: loading, className: "inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95 disabled:opacity-60", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Create account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "By creating an account you agree to our terms." })
  ] });
}
function Field({
  label,
  name,
  type = "text",
  error,
  hint,
  suffix,
  autoComplete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-xs font-medium text-foreground/80", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name, type, autoComplete, className: cn("w-full rounded-2xl border bg-background px-4 py-3 text-sm focus:outline-none", error ? "border-destructive focus:border-destructive" : "border-border focus:border-primary") }),
      suffix && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2", children: suffix })
    ] }),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-xs text-destructive", children: error }) : hint ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-xs text-muted-foreground", children: hint }) : null
  ] });
}
export {
  AuthPage as component
};
