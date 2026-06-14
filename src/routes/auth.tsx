import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Eye, EyeOff, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { bootstrapAdmin } from "@/lib/admin.functions";
import { cn } from "@/lib/utils";

const ADMIN_EMAIL = "admin@gifted.com";

const searchSchema = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({ meta: [{ title: "Sign in — gifted." }] }),
  component: AuthPage,
});

const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name").max(80),
    email: z.string().trim().email("Enter a valid email").max(255),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Add an uppercase letter")
      .regex(/[a-z]/, "Add a lowercase letter")
      .regex(/[0-9]/, "Add a number"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, { path: ["confirm"], message: "Passwords don't match" });

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Required"),
});

function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const nav = useNavigate();
  const search = useSearch({ from: "/auth" });
  const redirectTo = search.redirect || "/dashboard";

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) return;
      const target = await resolveRedirectForUser(data.session.user.id, redirectTo);
      nav({ to: target as "/dashboard" });
    });
  }, [nav, redirectTo]);

  async function handleSuccess() {
    const { data } = await supabase.auth.getUser();
    const target = data.user
      ? await resolveRedirectForUser(data.user.id, redirectTo)
      : redirectTo;
    nav({ to: target as "/dashboard" });
  }

  return (
    <div className="min-h-screen bg-hero-gradient">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-12">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-blush-gradient text-primary-foreground shadow-soft">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-3xl tracking-tight">gifted.</span>
        </Link>

        <div className="rounded-3xl bg-card p-7 shadow-lift sm:p-9">
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-full bg-muted p-1">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-full py-2 text-sm font-medium transition-soft",
                  tab === t ? "bg-background shadow-soft" : "text-muted-foreground",
                )}
              >
                {t === "login" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>
          {tab === "login" ? (
            <LoginForm onSuccess={handleSuccess} />
          ) : (
            <RegisterForm onSuccess={() => setTab("login")} />
          )}
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-card/70 p-4 text-xs text-muted-foreground shadow-soft backdrop-blur">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="font-medium text-foreground">Admin demo access</p>
            <p className="mt-0.5">
              Email <span className="font-mono">admin@gifted.com</span> · Password{" "}
              <span className="font-mono">Admin@12345</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

async function resolveRedirectForUser(userId: string, fallback: string) {
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  return data ? "/admin" : fallback;
}


function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [invalidEmail, setInvalidEmail] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);

  async function attemptSignIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setInvalidEmail(null);
    const fd = new FormData(e.currentTarget);
    const parsed = loginSchema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setLoading(true);
    let { error } = await attemptSignIn(parsed.data.email, parsed.data.password);

    // Seed the admin account on first sign-in attempt with the demo creds.
    if (
      error &&
      parsed.data.email.toLowerCase() === ADMIN_EMAIL &&
      /invalid/i.test(error.message)
    ) {
      try {
        await bootstrapAdmin();
        ({ error } = await attemptSignIn(parsed.data.email, parsed.data.password));
      } catch (e) {
        console.error("Admin bootstrap failed", e);
      }
    }

    setLoading(false);
    if (error) {
      setInvalidEmail(parsed.data.email);
      toast.error("Invalid email or password");
      return;
    }
    toast.success("Welcome back!");
    onSuccess();
  }

  async function handleQuickReset() {
    if (!invalidEmail) return;
    setResetting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(invalidEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setResetting(false);
    if (error) toast.error(error.message);
    else toast.success("Reset link sent — check your inbox.");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Email" name="email" type="email" error={errors.email} autoComplete="email" />
      <Field
        label="Password"
        name="password"
        type={show ? "text" : "password"}
        error={errors.password}
        autoComplete="current-password"
        suffix={
          <button type="button" onClick={() => setShow((v) => !v)} className="text-muted-foreground">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />
      <div className="flex items-center justify-between text-xs">
        <label className="inline-flex items-center gap-2">
          <input name="remember" type="checkbox" defaultChecked className="h-3.5 w-3.5 rounded border-border" />
          Remember me
        </label>
        <Link to="/forgot-password" className="text-primary hover:underline">
          Forgot password?
        </Link>
      </div>
      {invalidEmail && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-3 text-xs">
          <p className="font-medium text-destructive">Wrong password?</p>
          <button
            type="button"
            disabled={resetting}
            onClick={handleQuickReset}
            className="mt-1 inline-flex items-center gap-1 text-primary hover:underline disabled:opacity-60"
          >
            {resetting ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
            Send a password reset link to {invalidEmail}
          </button>
        </div>
      )}
      <button
        disabled={loading}
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95 disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
      </button>
    </form>
  );
}


function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const parsed = registerSchema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: parsed.data.fullName },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created! Check your email to confirm, then sign in.");
    onSuccess();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Full name" name="fullName" error={errors.fullName} autoComplete="name" />
      <Field label="Email" name="email" type="email" error={errors.email} autoComplete="email" />
      <Field
        label="Password"
        name="password"
        type={show ? "text" : "password"}
        error={errors.password}
        autoComplete="new-password"
        hint="8+ chars, with upper, lower, and number"
        suffix={
          <button type="button" onClick={() => setShow((v) => !v)} className="text-muted-foreground">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />
      <Field
        label="Confirm password"
        name="confirm"
        type={show ? "text" : "password"}
        error={errors.confirm}
        autoComplete="new-password"
      />
      <button
        disabled={loading}
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-card transition-soft hover:opacity-95 disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        By creating an account you agree to our terms.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  hint,
  suffix,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  hint?: string;
  suffix?: React.ReactNode;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground/80">{label}</span>
      <span className="relative block">
        <input
          name={name}
          type={type}
          autoComplete={autoComplete}
          className={cn(
            "w-full rounded-2xl border bg-background px-4 py-3 text-sm focus:outline-none",
            error ? "border-destructive focus:border-destructive" : "border-border focus:border-primary",
          )}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</span>}
      </span>
      {error ? (
        <span className="mt-1 block text-xs text-destructive">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  );
}
