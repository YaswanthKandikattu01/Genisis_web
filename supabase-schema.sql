-- ============================================
-- GENESIS - Supabase Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Hackathon Registrations Table
CREATE TABLE IF NOT EXISTS hackathon_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'success', 'failed')),
  transaction_id TEXT UNIQUE,
  order_id TEXT UNIQUE,
  payment_date TIMESTAMPTZ,
  candidate_status TEXT NOT NULL DEFAULT 'Registered' CHECK (candidate_status IN (
    'Registered',
    'Assessment Cleared',
    'Interview Round 1',
    'Interview Round 2',
    'HR Round',
    'Selected',
    'Rejected'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for scalability (100-1000 concurrent users)
CREATE INDEX IF NOT EXISTS idx_registrations_email ON hackathon_registrations (email);
CREATE INDEX IF NOT EXISTS idx_registrations_order_id ON hackathon_registrations (order_id);
CREATE INDEX IF NOT EXISTS idx_registrations_transaction_id ON hackathon_registrations (transaction_id);
CREATE INDEX IF NOT EXISTS idx_registrations_payment_status ON hackathon_registrations (payment_status);
CREATE INDEX IF NOT EXISTS idx_registrations_candidate_status ON hackathon_registrations (candidate_status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON hackathon_registrations (created_at DESC);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_hackathon_registrations_updated_at
  BEFORE UPDATE ON hackathon_registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security
ALTER TABLE hackathon_registrations ENABLE ROW LEVEL SECURITY;

-- Policy: service_role can do everything (used by our API)
CREATE POLICY "Service role full access"
  ON hackathon_registrations
  FOR ALL
  USING (TRUE)
  WITH CHECK (TRUE);

-- Contact Messages Table (optional)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on contacts"
  ON contact_messages
  FOR ALL
  USING (TRUE)
  WITH CHECK (TRUE);
