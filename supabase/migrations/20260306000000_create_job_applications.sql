-- Create table and status column
create table job_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  position text not null,
  experience_years text,
  about text,
  resume_url text,
  status text default 'new',
  created_at timestamp with time zone default now()
);

alter table job_applications enable row level security;

-- Policies for table
create policy "Allow public inserts for job applications"
  on job_applications for insert
  with check (true);

create policy "Allow authenticated reads for job applications"
  on job_applications for select
  to authenticated
  using (true);

create policy "Allow authenticated updates for job applications"
  on job_applications for update
  to authenticated
  using (true)
  with check (true);

-- Create Storage bucket
insert into storage.buckets (id, name, public) 
values ('resumes', 'resumes', false);

-- Policies for Storage bucket
create policy "Allow public uploads to resumes"
  on storage.objects
  for insert
  with check (
    bucket_id = 'resumes'
    AND auth.role() = 'anon'
  );

create policy "Allow authenticated reads for resumes"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'resumes');
