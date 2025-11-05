import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fcfddnxqjofovjrobgej.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZmRkbnhxam9mb3Zqcm9iZ2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3MjY4NzEsImV4cCI6MjAzOTMwMjg3MX0.VtaN3pUE-2QgM7TQE2fN8-hnF7Hn_Hn7Hn7Hn7Hn7Hn'

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseAnonKey);
console.log('Environment mode:', import.meta.env.MODE);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'coach-zafeer-website'
    }
  }
});

// Test connection
supabase.from('leads').select('count', { count: 'exact', head: true })
  .then(({ error, count }) => {
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connection successful. Leads count:', count);
    }
  })
  .catch(err => {
    console.error('Supabase connection test error:', err);
  });

// Database types
export interface Lead {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  age?: string
  occupation?: string
  work_hours?: string
  income?: string
  primary_goal?: string
  timeframe?: string
  previous_experience?: string
  current_challenges?: string[]
  weekly_commitment?: string
  investment_range?: string
  ready_to_start?: string
  seriousness?: string
  obstacles?: string
  motivation?: string
  qualification_score: number
  status: 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted' | 'lost' | 'call_booked'
  notes: string
  qualified: boolean
  facebook_pixel_tracked: boolean
  created_at: string
  updated_at: string
}

export interface CalendlyBooking {
  id: string
  calendly_event_id: string
  lead_id?: string
  invitee_name: string
  invitee_email: string
  event_name: string
  event_start_time: string
  event_end_time: string
  status: string
  calendly_uri?: string
  location?: string
  cancel_url?: string
  reschedule_url?: string
  created_at: string
  updated_at: string
}