-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'participant',
  state TEXT,
  lga TEXT,
  chapter TEXT,
  organization TEXT,
  position TEXT,
  avatar_url TEXT,
  payment_status TEXT DEFAULT 'pending',
  payment_reference TEXT,
  payment_amount NUMERIC,
  payment_date TIMESTAMP WITH TIME ZONE,
  accreditation_status TEXT DEFAULT 'pending',
  accreditation_date TIMESTAMP WITH TIME ZONE,
  qr_code TEXT
);

-- Create RLS policies for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own profile
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

-- Policy for users to update their own profile
CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Policy for admins to view all profiles
CREATE POLICY "Admins can view all profiles" 
  ON profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Policy for admins to update all profiles
CREATE POLICY "Admins can update all profiles" 
  ON profiles FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', 'participant');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create config table
CREATE TABLE IF NOT EXISTS config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT
);

-- Insert default config values
INSERT INTO config (key, value, description)
VALUES 
  ('registration_amount', '20000', 'Registration fee amount in Naira'),
  ('conference_name', '"7th Annual NAPPS National Education Summit 2024"', 'Name of the conference'),
  ('conference_date', '"January 15-17, 2024"', 'Date of the conference'),
  ('conference_venue', '"International Conference Center, Abuja"', 'Venue of the conference'),
  ('conference_theme', '"ADVANCING DIGITAL TRANSFORMATION IN NIGERIAN PRIVATE EDUCATION"', 'Theme of the conference')
ON CONFLICT (key) DO NOTHING;

-- Create RLS policies for config
ALTER TABLE config ENABLE ROW LEVEL SECURITY;

-- Policy for all users to view config
CREATE POLICY "All users can view config" 
  ON config FOR SELECT 
  TO authenticated, anon
  USING (true);

-- Policy for admins to update config
CREATE POLICY "Admins can update config" 
  ON config FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Add chapter field to profiles table if it doesn't exist
ALTER TABLE IF EXISTS public.profiles 
ADD COLUMN IF NOT EXISTS chapter TEXT;

-- Update config values for the new conference
UPDATE public.config 
SET value = '"7th Annual NAPPS National Education Summit 2024"', 
    description = 'Name of the conference' 
WHERE key = 'conference_name';

UPDATE public.config 
SET value = '"January 15-17, 2024"', 
    description = 'Date of the conference' 
WHERE key = 'conference_date';

UPDATE public.config 
SET value = '"International Conference Center, Abuja"', 
    description = 'Venue of the conference' 
WHERE key = 'conference_venue';

UPDATE public.config 
SET value = '"ADVANCING DIGITAL TRANSFORMATION IN NIGERIAN PRIVATE EDUCATION"', 
    description = 'Theme of the conference' 
WHERE key = 'conference_theme';

-- Insert if not exists
INSERT INTO public.config (key, value, description)
VALUES 
  ('conference_name', '"7th Annual NAPPS National Education Summit 2024"', 'Name of the conference'),
  ('conference_date', '"January 15-17, 2024"', 'Date of the conference'),
  ('conference_venue', '"International Conference Center, Abuja"', 'Venue of the conference'),
  ('conference_theme', '"ADVANCING DIGITAL TRANSFORMATION IN NIGERIAN PRIVATE EDUCATION"', 'Theme of the conference')
ON CONFLICT (key) DO NOTHING;

