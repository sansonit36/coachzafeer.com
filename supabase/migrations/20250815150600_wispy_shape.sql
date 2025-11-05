/*
  # Create leads table for fitness coaching application

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `first_name` (text, required)
      - `last_name` (text, required)
      - `email` (text, unique, required)
      - `phone` (text, optional)
      - `age` (text, optional)
      - `occupation` (text, optional)
      - `work_hours` (text, optional)
      - `income` (text, optional)
      - `primary_goal` (text, optional)
      - `timeframe` (text, optional)
      - `previous_experience` (text, optional)
      - `current_challenges` (text array, default empty)
      - `weekly_commitment` (text, optional)
      - `investment_range` (text, optional)
      - `ready_to_start` (text, optional)
      - `seriousness` (text, optional)
      - `obstacles` (text, optional)
      - `motivation` (text, optional)
      - `qualification_score` (integer, default 0)
      - `status` (text, default 'new')
      - `notes` (text, default empty)
      - `qualified` (boolean, default false)
      - `facebook_pixel_tracked` (boolean, default false)
      - `created_at` (timestamp with timezone, default now)
      - `updated_at` (timestamp with timezone, default now)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for public to insert leads (form submissions)
    - Add policy for authenticated users to read/update/delete leads (admin dashboard)
    - Add policy for service role to have full access
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  age text,
  occupation text,
  work_hours text,
  income text,
  primary_goal text,
  timeframe text,
  previous_experience text,
  current_challenges text[] DEFAULT '{}',
  weekly_commitment text,
  investment_range text,
  ready_to_start text,
  seriousness text,
  obstacles text,
  motivation text,
  qualification_score integer DEFAULT 0,
  status text DEFAULT 'new',
  notes text DEFAULT '',
  qualified boolean DEFAULT false,
  facebook_pixel_tracked boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy for public to insert leads (form submissions)
CREATE POLICY "Public can insert leads"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy for authenticated users to read leads
CREATE POLICY "Authenticated can read leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for authenticated users to update leads
CREATE POLICY "Authenticated can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy for authenticated users to delete leads
CREATE POLICY "Authenticated can delete leads"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);

-- Policy for service role to have full access
CREATE POLICY "Service role full access"
  ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_qualified ON leads(qualified);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();