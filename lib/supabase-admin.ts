import { createClient } from '@supabase/supabase-js'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

const PROJECT_URL = "https://umkvtzhvccnwfeugfgox.supabase.co";
const PRIVATE_KEY = process.env.SUPABASE_KEY || "";

// export const supabase_admin = createClient(PROJECT_URL, PRIVATE_KEY || '');
export const admin = createClient(PROJECT_URL, PRIVATE_KEY);
