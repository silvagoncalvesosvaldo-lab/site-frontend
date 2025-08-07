import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://drikipvmwlzlztjwgscu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyaWtpcHZtd2x6bHp0andnc2N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNzg3NjAsImV4cCI6MjA2ODg1NDc2MH0.9-RjBgucokFU5Hu6JBkqsa0uMA5MYTA-3hLPUNe4Bd8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);