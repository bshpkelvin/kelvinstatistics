
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  sender_name TEXT NOT NULL,
  email TEXT,
  message_text TEXT NOT NULL,
  reply_text TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT false
);

GRANT SELECT, INSERT ON public.comments TO anon;
GRANT SELECT, INSERT ON public.comments TO authenticated;
GRANT ALL ON public.comments TO service_role;

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Public can read only visible comments (email hidden via view/column projection in code)
CREATE POLICY "Public can read visible comments"
  ON public.comments FOR SELECT
  USING (is_visible = true);

-- Anyone can submit a new comment (starts hidden until admin approves)
CREATE POLICY "Anyone can submit a comment"
  ON public.comments FOR INSERT
  WITH CHECK (is_visible = false AND reply_text IS NULL);

CREATE INDEX comments_created_at_idx ON public.comments (created_at DESC);
