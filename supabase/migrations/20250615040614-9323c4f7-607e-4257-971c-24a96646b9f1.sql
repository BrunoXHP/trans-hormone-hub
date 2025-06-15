
-- 1. Table for community groups
CREATE TABLE public.community_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text,
  image text,
  created_by uuid NOT NULL REFERENCES profiles(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 2. Table for group members
CREATE TABLE public.group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES community_groups(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at timestamp with time zone DEFAULT now(),
  UNIQUE (group_id, user_id)
);

-- 3. Enable RLS for security
ALTER TABLE public.community_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;

-- 4. RLS: Anyone authenticated can view community groups
CREATE POLICY "Authenticated can view groups"
  ON public.community_groups
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- 5. RLS: Group creator can manage their group (update/delete)
CREATE POLICY "Creator can manage own group"
  ON public.community_groups
  FOR UPDATE USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Creator can delete own group"
  ON public.community_groups
  FOR DELETE USING (created_by = auth.uid());

-- 6. RLS: Anyone authenticated can join groups (insert rows in group_members)
CREATE POLICY "Authenticated can join groups"
  ON public.group_members
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 7. RLS: Anyone authenticated can view memberships to see their groups
CREATE POLICY "Members can view group memberships"
  ON public.group_members
  FOR SELECT
  USING (auth.uid() = user_id);

-- 8. RLS: Allow a user to leave a group (delete their row)
CREATE POLICY "Member can leave group"
  ON public.group_members
  FOR DELETE
  USING (auth.uid() = user_id);

-- 9. Make sure group_members can only update their own membership if needed (extra safety)
CREATE POLICY "Member can update their membership"
  ON public.group_members
  FOR UPDATE
  USING (auth.uid() = user_id);
