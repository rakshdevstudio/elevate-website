# X Elevators Website

Enterprise CRM and lead management platform built for **X Elevators Pvt Ltd**.

## Overview

X Elevators website is the customer-facing frontend platform for X Elevators Pvt. Ltd., designed for generating leads, showcasing premium lifts, and giving customers a premium experience.

## Features

- **Lead Management** – Capture, track, and manage customer leads
- **Sales Pipeline** – Visual kanban-style pipeline for deal progression
- **Site Visit Scheduling** – Book and manage on-site elevator inspections
- **Analytics Dashboard** – Business metrics and performance insights
- **Contact Form Integration** – Public-facing quote and inquiry form

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS, Radix UI
- **Backend/Auth**: Supabase (PostgreSQL + Auth)
- **State**: TanStack Query
- **Animations**: Framer Motion

## Project Structure

```
src/
  components/     # Reusable UI components
    admin/        # Admin panel layout & modals
    ui/           # shadcn/ui component library
  pages/          # Route-level page components
    admin/        # CRM admin pages
  hooks/          # Custom React hooks
  integrations/   # Supabase client setup
  lib/            # Utility functions
```

## Admin Routes

| Route | Description |
|---|---|
| `/admin/login` | CRM login page |
| `/admin/dashboard` | Overview dashboard |
| `/admin/leads` | Lead management |
| `/admin/pipeline` | Sales pipeline |
| `/admin/site-visits` | Site visit scheduling |
| `/admin/analytics` | Analytics & reports |

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

© X Elevators Pvt Ltd. All rights reserved.
