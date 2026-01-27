/*
  # Create Corstar Form Submission Tables

  1. New Tables
    - `leads` - General contact form submissions
      - `id` (uuid, primary key) - Unique identifier
      - `full_name` (text, not null) - Contact's full name
      - `email` (text, not null) - Contact's email address
      - `phone` (text, optional) - Contact's phone number
      - `company` (text, optional) - Company name
      - `service` (text, optional) - Service interest
      - `message` (text, optional) - Message content
      - `source` (text, optional) - Form source/page
      - `created_at` (timestamptz) - Timestamp of submission

    - `quotes` - Quote request submissions
      - `id` (uuid, primary key) - Unique identifier
      - `full_name` (text, not null) - Contact's full name
      - `email` (text, not null) - Contact's email address
      - `phone` (text, optional) - Contact's phone number
      - `company` (text, optional) - Company name
      - `location` (text, optional) - Project location
      - `service` (text, optional) - Service interest
      - `timeline` (text, optional) - Project timeline
      - `budget_range` (text, optional) - Budget range
      - `details` (text, optional) - Additional details
      - `created_at` (timestamptz) - Timestamp of submission

    - `callbacks` - Callback request submissions
      - `id` (uuid, primary key) - Unique identifier
      - `full_name` (text, not null) - Contact's full name
      - `phone` (text, not null) - Contact's phone number
      - `best_time` (text, optional) - Preferred callback time
      - `notes` (text, optional) - Additional notes
      - `created_at` (timestamptz) - Timestamp of submission

    - `events` - Event tracking for analytics
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text, not null) - Event name
      - `payload` (jsonb, optional) - Event data
      - `created_at` (timestamptz) - Timestamp of event

  2. Security
    - Enable RLS on all tables
    - Allow anonymous users to insert data (form submissions)
    - Only authenticated users can read data (admin access)

  3. Notes
    - Anonymous users can submit forms but cannot read data
    - Authenticated users (staff) have full read access
    - Event tracking allows analytics without exposing customer data
*/

-- Drop existing contact_submissions table if it exists
DROP TABLE IF EXISTS contact_submissions CASCADE;

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service text,
  message text,
  source text,
  created_at timestamptz DEFAULT now()
);

-- Create quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  location text,
  service text,
  timeline text,
  budget_range text,
  details text,
  created_at timestamptz DEFAULT now()
);

-- Create callbacks table
CREATE TABLE IF NOT EXISTS callbacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  best_time text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  payload jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE callbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policies for leads table
CREATE POLICY "Anyone can submit leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for quotes table
CREATE POLICY "Anyone can submit quotes"
  ON quotes
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view quotes"
  ON quotes
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for callbacks table
CREATE POLICY "Anyone can submit callbacks"
  ON callbacks
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view callbacks"
  ON callbacks
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for events table
CREATE POLICY "Anyone can create events"
  ON events
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);