import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "Profile — gifted." }] }),
  component: Profile,
});

function Profile() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const profile = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user!.id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (profile.data) {
      setName(profile.data.full_name ?? "");
      setPhone(profile.data.phone ?? "");
    }
  }, [profile.data]);

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user!.id, full_name: name, phone });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Profile updated");
      qc.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Account</p>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">Your profile</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate();
          }}
          className="mt-8 space-y-4 rounded-3xl bg-card p-6 shadow-soft sm:p-8"
        >
          <Field label="Full name" value={name} onChange={setName} />
          <Field label="Phone" value={phone} onChange={setPhone} type="tel" />
          <Field label="Email" value={user?.email ?? ""} onChange={() => {}} disabled />
          <button
            disabled={save.isPending}
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-card hover:opacity-95 disabled:opacity-60"
          >
            {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save changes"}
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground/80">{label}</span>
      <input
        value={value}
        type={type}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none disabled:opacity-60"
      />
    </label>
  );
}
