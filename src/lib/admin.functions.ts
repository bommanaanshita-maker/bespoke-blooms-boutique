import { createServerFn } from "@tanstack/react-start";

const ADMIN_EMAIL = "admin@gifted.com";
const ADMIN_PASSWORD = "Admin@12345";

/**
 * Idempotently ensures the seed admin user exists and has the 'admin' role.
 * Safe to call multiple times; safe to call unauthenticated (only creates
 * a fixed seed account, never escalates anyone else).
 */
export const bootstrapAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  // Look up by email via listUsers (admin API)
  let userId: string | null = null;
  const list = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
  const existing = list.data.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL);
  if (existing) {
    userId = existing.id;
  } else {
    const created = await supabaseAdmin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: "Admin" },
    });
    if (created.error) throw new Error(created.error.message);
    userId = created.data.user?.id ?? null;
  }
  if (!userId) throw new Error("Failed to ensure admin user");

  // Grant admin role (idempotent via UNIQUE constraint)
  await supabaseAdmin
    .from("user_roles")
    .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

  return { ok: true, email: ADMIN_EMAIL };
});
