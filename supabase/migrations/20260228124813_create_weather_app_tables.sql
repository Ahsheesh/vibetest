/*
  # Weather App Database Setup
  
  1. New Tables
    - `favorites`: Stores user's favorite cities
      - `id` (uuid, primary key)
      - `user_id` (text) - Anonymous user ID
      - `city_name` (text) - City name
      - `created_at` (timestamp)
    
    - `search_history`: Stores recent search queries
      - `id` (uuid, primary key)
      - `user_id` (text) - Anonymous user ID
      - `city_name` (text) - Searched city
      - `searched_at` (timestamp)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for anonymous users to manage their own data
*/

CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  city_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, city_name)
);

CREATE TABLE IF NOT EXISTS search_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  city_name text NOT NULL,
  searched_at timestamptz DEFAULT now()
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own favorites"
  ON favorites
  FOR ALL
  TO anon
  USING (user_id = current_setting('request.jwt.claims', true)::jsonb->>'user_id')
  WITH CHECK (user_id = current_setting('request.jwt.claims', true)::jsonb->>'user_id');

CREATE POLICY "Users can manage their own search history"
  ON search_history
  FOR ALL
  TO anon
  USING (user_id = current_setting('request.jwt.claims', true)::jsonb->>'user_id')
  WITH CHECK (user_id = current_setting('request.jwt.claims', true)::jsonb->>'user_id');
