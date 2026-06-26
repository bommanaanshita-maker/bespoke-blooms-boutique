import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Star, Trash2, Pencil, Loader2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/addresses")({
  head: () => ({ meta: [{ title: "Saved addresses — gifted." }] }),
  component: Addresses,
});

type Addr = {
  id?: string;
  label: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  pincode: string;
  is_default?: boolean;
};

const empty: Addr = { label: "Home", name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "", is_default: false };

function Addresses() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Addr | null>(null);

  const q = useQuery({
    queryKey: ["addresses", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const save = useMutation({
    mutationFn: async (a: Addr) => {
      const payload = { ...a, user_id: user!.id };
      if (a.id) {
        const { error } = await supabase.from("addresses").update(payload).eq("id", a.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("addresses").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Address saved");
      qc.invalidateQueries({ queryKey: ["addresses", user?.id] });
      setEditing(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("addresses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["addresses", user?.id] }),
  });

  const setDefault = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("addresses").update({ is_default: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["addresses", user?.id] }),
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Account</p>
            <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">Saved addresses</h1>
          </div>
          <button
            onClick={() => setEditing(empty)}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-card hover:opacity-95"
          >
            <Plus className="h-4 w-4" /> New address
          </button>
        </div>

        {q.isLoading ? (
          <p className="mt-10 text-sm text-muted-foreground">Loading…</p>
        ) : (q.data ?? []).length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted">
              <MapPin className="h-4 w-4" />
            </span>
            <p className="mt-4 font-display text-xl">No addresses saved</p>
          </div>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {q.data!.map((a) => (
              <li key={a.id} className="rounded-3xl bg-card p-5 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium">{a.label}</span>
                  {a.is_default && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                      <Star className="h-3 w-3 fill-current" /> Default
                    </span>
                  )}
                </div>
                <p className="mt-3 font-medium">{a.name}</p>
                <p className="text-sm text-muted-foreground">{a.phone}</p>
                <p className="mt-2 text-sm">
                  {a.line1}{a.line2 ? `, ${a.line2}` : ""}<br />
                  {a.city}, {a.state} {a.pincode}
                </p>
                <div className="mt-4 flex gap-2">
                  {!a.is_default && (
                    <button
                      onClick={() => setDefault.mutate(a.id)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs hover:bg-muted"
                    >
                      Set default
                    </button>
                  )}
                  <button
                    onClick={() => setEditing(a)}
                    className="grid h-8 w-8 place-items-center rounded-full border border-border hover:bg-muted"
                    aria-label="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => remove.mutate(a.id)}
                    className="grid h-8 w-8 place-items-center rounded-full border border-border text-destructive hover:bg-muted"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Footer />

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setEditing(null)}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              save.mutate(editing);
            }}
            className="w-full max-w-lg space-y-3 rounded-3xl bg-background p-6 shadow-lift sm:p-8"
          >
            <h2 className="font-display text-2xl">{editing.id ? "Edit address" : "New address"}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Inp label="Label" value={editing.label} onChange={(v) => setEditing({ ...editing, label: v })} />
              <Inp label="Full name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v.replace(/[^A-Za-z\s]/g, "") })} required pattern="[A-Za-z\s]+" title="Name should only contain letters and spaces" />
              <Inp label="Phone" value={editing.phone} onChange={(v) => setEditing({ ...editing, phone: v.replace(/\D/g, "").slice(0, 10) })} required type="tel" inputMode="numeric" pattern="[0-9]{10}" title="Phone number must be exactly 10 digits" maxLength={10} />
              <Inp label="Pincode" value={editing.pincode} onChange={(v) => setEditing({ ...editing, pincode: v.replace(/\D/g, "").slice(0, 6) })} required inputMode="numeric" pattern="[0-9]{6}" title="Pincode must be exactly 6 digits" maxLength={6} />
              <div className="sm:col-span-2">
                <Inp label="Address line 1" value={editing.line1} onChange={(v) => setEditing({ ...editing, line1: v })} required />
              </div>
              <div className="sm:col-span-2">
                <Inp label="Address line 2 (optional)" value={editing.line2 ?? ""} onChange={(v) => setEditing({ ...editing, line2: v })} />
              </div>
              <Inp label="City" value={editing.city} onChange={(v) => setEditing({ ...editing, city: v.replace(/[^A-Za-z\s]/g, "") })} required pattern="[A-Za-z\s]+" title="City should only contain letters and spaces" />
              <Inp label="State" value={editing.state} onChange={(v) => setEditing({ ...editing, state: v.replace(/[^A-Za-z\s]/g, "") })} required pattern="[A-Za-z\s]+" title="State should only contain letters and spaces" />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editing.is_default ?? false}
                onChange={(e) => setEditing({ ...editing, is_default: e.target.checked })}
              />
              Set as default
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setEditing(null)} className="rounded-full border border-border px-4 py-2 text-sm">
                Cancel
              </button>
              <button
                disabled={save.isPending}
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-95 disabled:opacity-60"
              >
                {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Inp({
  label,
  value,
  onChange,
  required,
  type = "text",
  pattern,
  title,
  maxLength,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  pattern?: string;
  title?: string;
  maxLength?: number;
  inputMode?: "text" | "numeric" | "tel" | "email" | "decimal" | "search" | "url" | "none";
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground/80">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        pattern={pattern}
        title={title}
        maxLength={maxLength}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
      />
    </label>
  );
}
