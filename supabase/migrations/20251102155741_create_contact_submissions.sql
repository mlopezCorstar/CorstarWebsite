/*
  # Create Contact Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `first_name` (text) - Contact's first name
      - `last_name` (text) - Contact's last name
      - `email` (text) - Contact's email address
      - `phone` (text, optional) - Contact's phone number
      - `company` (text, optional) - Contact's company name
      - `service_interest` (text, optional) - Service they're interested in
      - `message` (text) - Message content
      - `created_at` (timestamptz) - Timestamp of submission
      - `status` (text) - Status of the inquiry (new, contacted, resolved)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for public users to insert submissions
    - Add policy for authenticated users to read all submissions
    - Add policy for authenticated users to update submission status

  3. Notes
    - Public users can only create submissions, not read them
    - This protects customer data while allowing form submissions
    - Authenticated users (staff) can view and manage all submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service_interest text,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submission status"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);