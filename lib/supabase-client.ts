import { createClient } from '@supabase/supabase-js'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

const PROJECT_URL = "https://umkvtzhvccnwfeugfgox.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVta3Z0emh2Y2Nud2ZldWdmZ294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI0MzMxODMsImV4cCI6MTk4ODAwOTE4M30.Vg2pySD-DiT-r7TwALoVqzcoKwE8ISw1SryxpdTI6iw";

export const client = createClient(PROJECT_URL, PUBLIC_KEY);
