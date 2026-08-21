import { createClient } from '@supabase/supabase-js';
import { STORE_CONFIG } from '../config';

// Initialize the Supabase client
export const supabase = createClient(
  STORE_CONFIG.SUPABASE_URL,
  STORE_CONFIG.SUPABASE_PUBLISHABLE_KEY
);
