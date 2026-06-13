import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAuth, N as Navbar } from "./Navbar-FQbSlWmj.mjs";
import { F as Footer } from "./Footer-DuM0UnWI.mjs";
import { supabase } from "./client-pPoEERrW.mjs";
import { f as LoaderCircle } from "../_libs/lucide-react.mjs";
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
function Profile() {
  const {
    user
  } = useAuth();
  const qc = useQueryClient();
  const profile = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (error) throw error;
      return data;
    }
  });
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (profile.data) {
      setName(profile.data.full_name ?? "");
      setPhone(profile.data.phone ?? "");
    }
  }, [profile.data]);
  const save = useMutation({
    mutationFn: async () => {
      const {
        error
      } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: name,
        phone
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Profile updated");
      qc.invalidateQueries({
        queryKey: ["profile", user?.id]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-3xl px-5 py-12 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl leading-tight sm:text-5xl", children: "Your profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        save.mutate();
      }, className: "mt-8 space-y-4 rounded-3xl bg-card p-6 shadow-soft sm:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", value: name, onChange: setName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone", value: phone, onChange: setPhone, type: "tel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", value: user?.email ?? "", onChange: () => {
        }, disabled: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: save.isPending, className: "inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-card hover:opacity-95 disabled:opacity-60", children: save.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Save changes" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  disabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-xs font-medium text-foreground/80", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, type, disabled, onChange: (e) => onChange(e.target.value), className: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none disabled:opacity-60" })
  ] });
}
export {
  Profile as component
};
