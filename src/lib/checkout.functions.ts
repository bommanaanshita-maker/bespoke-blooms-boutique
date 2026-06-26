import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/require-auth";

type IncomingItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  customization?: Record<string, unknown> | null;
};

type Payload = { orderId: string; items: IncomingItem[] };

/**
 * Server-side insertion of order items. Verifies the order belongs to the
 * authenticated user before writing via the service role. This replaces a
 * direct client INSERT policy so users cannot mutate items after checkout.
 */
export const createOrderItems = createServerFn({ method: "POST" })
  .inputValidator((data: Payload) => {
    if (!data || typeof data.orderId !== "string" || !Array.isArray(data.items)) {
      throw new Error("Invalid payload");
    }
    if (data.items.length === 0) throw new Error("No items to add");
    return data;
  })
  .handler(async ({ data }) => {
    const { user } = await requireSupabaseAuth();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Verify order ownership AND that it has no items yet (only the
    // creation flow may seed items — never an after-the-fact append).
    const { data: order, error: orderErr } = await supabaseAdmin
      .from("orders")
      .select("id, user_id")
      .eq("id", data.orderId)
      .maybeSingle();
    if (orderErr) throw new Error(orderErr.message);
    if (!order || order.user_id !== user.id) throw new Error("Order not found");

    const { count, error: countErr } = await supabaseAdmin
      .from("order_items")
      .select("id", { count: "exact", head: true })
      .eq("order_id", data.orderId);
    if (countErr) throw new Error(countErr.message);
    if ((count ?? 0) > 0) throw new Error("Order items already exist");

    const rows = data.items.map((i) => ({
      order_id: data.orderId,
      product_id: i.productId,
      name: i.name,
      image: i.image,
      price: i.price,
      qty: i.qty,
      customization: i.customization ?? {},
    }));

    const { error } = await supabaseAdmin.from("order_items").insert(rows);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
