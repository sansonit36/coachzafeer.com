/*
  # Create calendly_bookings table for tracking call bookings

  1. New Tables
    - `calendly_bookings`
      - `id` (uuid, primary key)
      - `calendly_event_id` (text, unique, required)
      - `lead_id` (uuid, foreign key to leads table)
      - `invitee_name` (text, required)
      - `invitee_email` (text, required)
      - `event_name` (text, required)
      - `event_start_time` (timestamp with timezone, required)
      - `event_end_time` (timestamp with timezone, required)
      - `status` (text, default 'active')
      - `calendly_uri` (text, optional)
      - `location` (text, optional)
      - `cancel_url` (text, optional)
      - `reschedule_url` (text, optional)
      - `created_at` (timestamp with timezone, default now)
      - `updated_at` (timestamp with timezone, default now)

  2. Security
    - Enable RLS on `calendly_bookings` table
    - Add policy for authenticated users to read bookings
    - Add policy for service role to have full access

  3. Functions
    - Create function to automatically link bookings to leads by email
*/

CREATE TABLE IF NOT EXISTS calendly_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  calendly_event_id text UNIQUE NOT NULL,
  lead_id uuid REFERENCES leads(id) ON DELETE SET NULL,
  invitee_name text NOT NULL,
  invitee_email text NOT NULL,
  event_name text NOT NULL,
  event_start_time timestamptz NOT NULL,
  event_end_time timestamptz NOT NULL,
  status text DEFAULT 'active',
  calendly_uri text,
  location text,
  cancel_url text,
  reschedule_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE calendly_bookings ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to read bookings
CREATE POLICY "Allow authenticated users to read bookings"
  ON calendly_bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for service role to have full access
CREATE POLICY "Allow service role full access to bookings"
  ON calendly_bookings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_calendly_id ON calendly_bookings(calendly_event_id);
CREATE INDEX IF NOT EXISTS idx_bookings_lead_id ON calendly_bookings(lead_id);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON calendly_bookings(invitee_email);

-- Create updated_at trigger for calendly_bookings
CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON calendly_bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically link bookings to leads by email
CREATE OR REPLACE FUNCTION link_booking_to_lead()
RETURNS TRIGGER AS $$
BEGIN
  -- Try to find a matching lead by email
  UPDATE calendly_bookings 
  SET lead_id = (
    SELECT id FROM leads 
    WHERE email = NEW.invitee_email 
    LIMIT 1
  )
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically link bookings to leads
CREATE TRIGGER link_booking_to_lead_trigger
  AFTER INSERT ON calendly_bookings
  FOR EACH ROW
  EXECUTE FUNCTION link_booking_to_lead();