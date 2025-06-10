
-- Create table for post comments
CREATE TABLE public.post_comments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

-- Policy for users to view comments on any post
CREATE POLICY "Users can view all comments" 
  ON public.post_comments 
  FOR SELECT 
  USING (true);

-- Policy for users to create their own comments
CREATE POLICY "Users can create their own comments" 
  ON public.post_comments 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own comments
CREATE POLICY "Users can update their own comments" 
  ON public.post_comments 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Policy for users to delete their own comments
CREATE POLICY "Users can delete their own comments" 
  ON public.post_comments 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_post_comments_post_id ON public.post_comments(post_id);
CREATE INDEX idx_post_comments_user_id ON public.post_comments(user_id);
