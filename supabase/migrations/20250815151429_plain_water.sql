/*
  # Complete Clean Setup - Force Drop Everything

  1. Force Drop All Objects
    - Drop all policies with CASCADE
    - Drop all triggers and functions with CASCADE
    - Drop all tables with CASCADE
    - Use IF EXISTS to prevent errors

  2. Create Fresh Tables
    - `leads` table with all required fields
    - `calendly_bookings` table for call tracking
    - Proper constraints and indexes

  3. Security Setup
    - Enable RLS on all tables
    - Create fresh policies with unique names
    - Proper permissions for different roles

  4. Automation
    - Auto-update timestamps
    - Auto-link bookings to leads
    - Status updates on booking
*/

-- Force drop everything with CASCADE to handle dependencies
DROP POLICY IF EXISTS "Public can insert leads" ON leads CASCADE;
DROP POLICY IF EXISTS "Authenticated can read leads" ON leads CASCADE;
DROP POLICY IF EXISTS "Authenticated can update leads" ON leads CASCADE;
DROP POLICY IF EXISTS "Authenticated can delete leads" ON leads CASCADE;
DROP POLICY IF EXISTS "Service role full access" ON leads CASCADE;
DROP POLICY IF EXISTS "Allow authenticated users to read bookings" ON calendly_bookings CASCADE;
DROP POLICY IF EXISTS "Allow service role full access to bookings" ON calendly_bookings CASCADE;

-- Drop triggers
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads CASCADE;
DROP TRIGGER IF EXISTS update_bookings_updated_at ON calendly_bookings CASCADE;
DROP TRIGGER IF EXISTS link_booking_to_lead_trigger ON calendly_bookings CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS link_booking_to_lead() CASCADE;

-- Drop tables completely
DROP TABLE IF EXISTS calendly_bookings CASCADE;
DROP TABLE IF EXISTS leads CASCADE;

-- Create updated_at function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create leads table
CREATE TABLE leads (
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
    status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'unqualified', 'converted', 'lost', 'call_booked')),
    notes text DEFAULT '',
    qualified boolean DEFAULT false,
    facebook_pixel_tracked boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create calendly_bookings table
CREATE TABLE calendly_bookings (
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

-- Create indexes for performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_qualified ON leads(qualified);
CREATE INDEX idx_bookings_email ON calendly_bookings(invitee_email);
CREATE INDEX idx_bookings_lead_id ON calendly_bookings(lead_id);
CREATE INDEX idx_bookings_calendly_id ON calendly_bookings(calendly_event_id);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendly_bookings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for leads with unique names
CREATE POLICY "leads_public_insert_policy" ON leads
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "leads_authenticated_read_policy" ON leads
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "leads_authenticated_update_policy" ON leads
    FOR UPDATE TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "leads_authenticated_delete_policy" ON leads
    FOR DELETE TO authenticated
    USING (true);

CREATE POLICY "leads_service_role_all_policy" ON leads
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- Create RLS policies for calendly_bookings with unique names
CREATE POLICY "bookings_authenticated_read_policy" ON calendly_bookings
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "bookings_service_role_all_policy" ON calendly_bookings
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- Create triggers for updated_at
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON calendly_bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to link bookings to leads
CREATE OR REPLACE FUNCTION link_booking_to_lead()
RETURNS TRIGGER AS $$
BEGIN
    -- Try to find matching lead by email
    UPDATE leads 
    SET 
        lead_id = (
            SELECT id 
            FROM leads 
            WHERE email = NEW.invitee_email 
            LIMIT 1
        ),
        status = CASE 
            WHEN status != 'converted' THEN 'call_booked'
            ELSE status
        END,
        notes = CASE
            WHEN notes = '' THEN '[SYSTEM] Call booked via Calendly on ' || NEW.created_at::text
            ELSE notes || E'\n[SYSTEM] Call booked via Calendly on ' || NEW.created_at::text
        END
    WHERE email = NEW.invitee_email;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-link bookings
CREATE TRIGGER link_booking_to_lead_trigger
    AFTER INSERT ON calendly_bookings
    FOR EACH ROW
    EXECUTE FUNCTION link_booking_to_lead();