-- Hero Slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tag VARCHAR(100) NOT NULL DEFAULT '',
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  image TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  role VARCHAR(200) NOT NULL DEFAULT '',
  avatar TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS but allow anon access (simple setup)
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for hero_slides" ON hero_slides FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for team_members" ON team_members FOR ALL USING (true) WITH CHECK (true);
