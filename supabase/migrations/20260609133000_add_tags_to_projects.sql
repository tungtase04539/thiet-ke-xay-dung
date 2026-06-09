-- Migration: Add tags column to projects table for SEO purposes
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS tags jsonb default '[]'::jsonb;
