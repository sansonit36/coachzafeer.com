/*
  # Fix RLS Policy for Lead Insertion

  1. Security Updates
    - Drop existing conflicting policies
    - Create proper policy for anonymous lead insertion
    - Allow public users to insert leads (for lead capture form)
    - Maintain security for other operations
*/

-- Drop existing policies that might be conflicting
DROP POLICY IF EXISTS "Public can insert leads" ON leads;
DROP POLICY IF EXISTS "leads_public_insert_policy" ON leads;
DROP POLICY IF EXISTS "leads_anon_insert_policy" ON leads;

-- Create a proper policy for anonymous users to insert leads
CREATE POLICY "allow_anon_insert_leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure authenticated users can also insert leads
CREATE POLICY "allow_authenticated_insert_leads"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);