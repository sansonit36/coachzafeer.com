/*
  # Disable All Security - Make Everything Public

  This migration completely disables Row Level Security and makes all tables
  publicly accessible for reading and writing. No authentication required.

  ## Changes Made:
  1. Disable RLS on all tables
  2. Remove all existing policies
  3. Make tables completely public
  4. No security restrictions whatsoever

  ## Warning:
  This makes your database completely open to the public.
  Only use this for development/testing purposes.
*/

-- Disable RLS on leads table
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- Disable RLS on calendly_bookings table  
ALTER TABLE calendly_bookings DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies to avoid conflicts
DROP POLICY IF EXISTS "allow_anon_insert_leads" ON leads;
DROP POLICY IF EXISTS "allow_authenticated_insert_leads" ON leads;
DROP POLICY IF EXISTS "leads_authenticated_read_policy" ON leads;
DROP POLICY IF EXISTS "leads_authenticated_update_policy" ON leads;
DROP POLICY IF EXISTS "leads_authenticated_delete_policy" ON leads;
DROP POLICY IF EXISTS "leads_service_role_all_policy" ON leads;
DROP POLICY IF EXISTS "bookings_authenticated_read_policy" ON calendly_bookings;
DROP POLICY IF EXISTS "bookings_service_role_all_policy" ON calendly_bookings;

-- Grant full public access to leads table
GRANT ALL ON leads TO anon;
GRANT ALL ON leads TO authenticated;
GRANT ALL ON leads TO service_role;

-- Grant full public access to calendly_bookings table
GRANT ALL ON calendly_bookings TO anon;
GRANT ALL ON calendly_bookings TO authenticated;
GRANT ALL ON calendly_bookings TO service_role;

-- Grant usage on sequences (for auto-incrementing IDs)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO service_role;