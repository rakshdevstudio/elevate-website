create table if not exists public.website_analytics_events (
  id bigint generated always as identity primary key,
  event_hash text not null unique,
  event_type text not null,
  event_name text,
  event_data jsonb,
  occurred_at timestamptz not null,
  project_id text,
  owner_id text,
  data_source_name text,
  session_id bigint,
  device_id bigint,
  origin text,
  path text,
  route text,
  referrer text,
  query_params text,
  country text,
  region text,
  city text,
  vercel_environment text,
  vercel_url text,
  raw_event jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists website_analytics_events_occurred_at_idx on public.website_analytics_events (occurred_at desc);
create index if not exists website_analytics_events_path_idx on public.website_analytics_events (path);
create index if not exists website_analytics_events_session_id_idx on public.website_analytics_events (session_id);
create index if not exists website_analytics_events_vercel_environment_idx on public.website_analytics_events (vercel_environment);

alter table public.website_analytics_events enable row level security;

create policy "Admins can read website analytics events"
on public.website_analytics_events
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create or replace function public.get_website_analytics_snapshot(
  p_public_paths text[],
  p_today_start timestamptz,
  p_week_start timestamptz,
  p_admin_prefix text default '/x-control-9x7-panel'
)
returns table (
  total_visitors bigint,
  visitors_today bigint,
  visitors_this_week bigint,
  page_views bigint,
  top_viewed_page text,
  updated_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  with filtered as (
    select
      occurred_at,
      path,
      coalesce(session_id::text, device_id::text) as visitor_key
    from public.website_analytics_events
    where event_type = 'pageview'
      and coalesce(vercel_environment, 'production') = 'production'
      and path = any (p_public_paths)
      and path not like p_admin_prefix || '%'
  ),
  top_page as (
    select path
    from filtered
    group by path
    order by count(*) desc, path asc
    limit 1
  )
  select
    count(distinct visitor_key)::bigint as total_visitors,
    count(distinct visitor_key) filter (where occurred_at >= p_today_start)::bigint as visitors_today,
    count(distinct visitor_key) filter (where occurred_at >= p_week_start)::bigint as visitors_this_week,
    count(*)::bigint as page_views,
    (select path from top_page) as top_viewed_page,
    max(occurred_at) as updated_at
  from filtered;
$$;

grant execute on function public.get_website_analytics_snapshot(text[], timestamptz, timestamptz, text) to authenticated, service_role;
