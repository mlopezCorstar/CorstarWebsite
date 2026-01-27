/*
  # Add source field to callbacks table

  1. Changes
    - Add `source` column to `callbacks` table to track where callback requests originated

  2. Notes
    - This allows tracking which CTA or page generated the callback request
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'callbacks' AND column_name = 'source'
  ) THEN
    ALTER TABLE callbacks ADD COLUMN source text;
  END IF;
END $$;