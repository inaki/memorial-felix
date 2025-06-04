import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import type { Event } from "../types";

// Event queries
export const useEventQuery = () => {
  return useQuery({
    queryKey: ["event"],
    queryFn: async (): Promise<Event> => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },
  });
};

export const useEventByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async (): Promise<Event> => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useUpdateEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...fields }: { id: string } & Partial<Event>) => {
      const { data, error } = await supabase
        .from("events")
        .update(fields)
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data, variables) => {
      // Invalidate the event query for this id
      queryClient.invalidateQueries({ queryKey: ["event", variables.id] });
    },
  });
};
