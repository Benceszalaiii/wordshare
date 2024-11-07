import { createClient } from "@supabase/supabase-js";
// Create Supabase client
export const supabase = createClient(
    process.env.SUPABASE_STORAGE_URL as string,
    process.env.SUPABASE_API_KEY as string,
);
