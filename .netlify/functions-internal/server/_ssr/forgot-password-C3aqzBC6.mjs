import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { supabase } from "./client-pPoEERrW.mjs";
import { b as Sparkles, g as MailCheck, f as LoaderCircle } from "../_libs/lucide-react.mjs";
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
function Forgot() {
  const [loading, setLoading] = reactExports.useState(false);
  const [sent, setSent] = reactExports.useState(false);
  async function onSubmit(e) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!email) return toast.error("Enter your email");
    setLoading(true);
    const {
      error
    } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    setSent(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-hero-gradient", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mb-8 flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-full bg-blush-gradient text-primary-foreground shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl tracking-tight", children: "gifted." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-card p-7 shadow-lift sm:p-9", children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto grid h-12 w-12 place-items-center rounded-full bg-blush/30 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MailCheck, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-2xl", children: "Check your inbox" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "We sent a reset link. Open it on this device to set a new password." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "mt-6 inline-block text-sm text-primary underline", children: "Back to sign in" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl", children: "Reset your password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Enter your email and we'll send you a reset link." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "mt-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-xs font-medium text-foreground/80", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "email", type: "email", required: true, className: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: loading, className: "inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95 disabled:opacity-60", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Send reset link" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "block text-center text-xs text-muted-foreground hover:text-foreground", children: "Back to sign in" })
      ] })
    ] }) })
  ] }) });
}
export {
  Forgot as component
};
