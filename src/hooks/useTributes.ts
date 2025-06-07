import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Tribute } from "@/types";
import { queryClient } from "@/lib/queries";

// Tributes queries
export const useTributesQuery = () => {
  return useQuery({
    queryKey: ["tributes"],
    queryFn: async (): Promise<Tribute[]> => {
      const { data, error } = await supabase
        .from("tributes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (!data) return [];

      // Deduplicate by author+message
      const seen = new Set();
      const deduped = data.filter((item) => {
        const key = `${item.author}||${item.message}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      return deduped;
    },
  });
};

// Add tribute mutation
export const useAddTributeMutation = () => {
  return useMutation({
    mutationFn: async ({
      author,
      message,
      imageFile,
    }: {
      author: string;
      message: string;
      imageFile?: File;
    }) => {
      let image_url = undefined;

      // Upload image if provided
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("tribute-images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage
          .from("tribute-images")
          .getPublicUrl(uploadData.path);

        image_url = publicUrl;
      }

      // Insert tribute
      const { data, error } = await supabase
        .from("tributes")
        .insert([
          {
            author,
            message,
            image_url,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tributes"] });
      queryClient.refetchQueries({ queryKey: ["tributes"] });
    },
  });
};
