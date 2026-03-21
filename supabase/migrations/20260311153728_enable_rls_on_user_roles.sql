-- Enable Row Level Security on user_roles table to fix the security vulnerability
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;