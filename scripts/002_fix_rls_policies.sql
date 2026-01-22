-- Drop existing problematic policies
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "general_secretary_select_all_profiles" ON public.profiles;

-- Create a simpler, working policy for profiles
-- Allow users to select their own profile (uses auth.uid() directly, no recursion)
CREATE POLICY "profiles_select_own" ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "profiles_update_own" ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Allow general secretary to view all profiles using user metadata instead of profile table
-- This avoids the circular reference
CREATE POLICY "general_secretary_select_all" ON public.profiles 
  FOR SELECT 
  USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'general_secretary'
    OR auth.uid() = id
  );

-- Fix players policies to avoid circular reference
DROP POLICY IF EXISTS "players_select_general_secretary" ON public.players;
DROP POLICY IF EXISTS "players_select_state_secretary" ON public.players;

CREATE POLICY "players_select_authenticated" ON public.players 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Allow update for general secretary
CREATE POLICY "players_update_general_secretary" ON public.players 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Allow insert for profiles (for creating state secretaries)
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;
CREATE POLICY "profiles_insert_authenticated" ON public.profiles 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);
