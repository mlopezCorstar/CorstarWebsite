/*
  # Create inquiries table for unified CTA form submissions

  1. New Tables
    - `inquiries`
      - `id` (uuid, primary key) - Unique identifier for each inquiry
      - `full_name` (text, required) - Contact's full name
      - `email` (text, required) - Contact's email address
      - `phone` (text, optional) - Contact's phone number
      - `company` (text, optional) - Contact's company name
      - `location` (text, optional) - City/state or zip code
      - `service` (text, optional) - Service interest (Cabling, IT Services, Other)
      - `timeline` (text, optional) - Project timeline (ASAP, 2-4 weeks, Planning)
      - `budget_range` (text, optional) - Budget range for the project
      - `details` (text, optional) - Additional details or message
      - `source` (text, required) - CTA source identifier (e.g., hero_cta, footer_cta)
      - `intent` (text, required) - Type of inquiry (quote, contact, callback)
      - `created_at` (timestamptz) - Timestamp of submission

  2. Security
    - Enable RLS on `inquiries` table
    - Add policy for service role to insert data (edge functions)
    - Add policy for authenticated admins to read data

  3. Important Notes
    - This table consolidates all form submissions from various CTAs
    - The `source` and `intent` fields track where the submission came from
    - Required fields vary based on `intent`: contact needs name/email, quote needs location/timeline/budget, callback needs name/phone
*/

CREATE TABLE IF NOT EXISTS inquiries (
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
  source text NOT NULL,
  intent text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role to insert inquiries"
  ON inquiries
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read inquiries"
  ON inquiries
  FOR SELECT
  TO authenticated
  USING (true);