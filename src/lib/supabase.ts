import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with environment variables
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Check password against database
export const checkPassword = async (password: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "event_password")
      .single();

    if (error) throw error;
    return data.value === password;
  } catch (error) {
    console.error("Error checking password:", error);
    return false;
  }
};

// Set auth in local storage
export const setAuth = (isAuthenticated: boolean) => {
  localStorage.setItem("memorial_auth", isAuthenticated ? "true" : "false");
};

// Check if authenticated
export const isAuthenticated = (): boolean => {
  return localStorage.getItem("memorial_auth") === "true";
};

// Clear auth
export const clearAuth = () => {
  localStorage.removeItem("memorial_auth");
};
