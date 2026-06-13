import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export function useWishlist() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const q = useQuery({
    queryKey: ["wishlist", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wishlist")
        .select("product_id")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data.map((r) => r.product_id);
    },
  });

  const toggle = useMutation({
    mutationFn: async (productId: string) => {
      if (!user) throw new Error("Not signed in");
      const has = q.data?.includes(productId);
      if (has) {
        const { error } = await supabase
          .from("wishlist")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("wishlist")
          .insert({ user_id: user.id, product_id: productId });
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wishlist", user?.id] }),
  });

  return { ids: q.data ?? [], isLoading: q.isLoading, toggle: toggle.mutate, has: (id: string) => (q.data ?? []).includes(id) };
}
