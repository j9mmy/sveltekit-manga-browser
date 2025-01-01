# SvelteKit Manga Browser

A full-stack web application for browsing and tracking manga using the AniList API. Built with SvelteKit, Drizzle ORM, and SQLite. Made for me to learn the Svelte/SvelteKit (ecosystem).

## Features

- Browse manga from AniList's database
- Search by title and filter by genre
- View detailed manga information including:
  - Cover art and banner images
  - Description
  - Statistics (favorites, score, chapters)
  - Character list
- Track your manga reading:
  - Mark as Planning/Reading/Completed/Dropped
  - Rate manga from 1-10
  - View your manga list in profile

## Tech stack

SvelteKit in itself isn't a full-stack framework, but making it one is very easy. In MVC context, SvelteKit only makes up the View and Controller aspects of it, but by adding Drizzle ORM you can easily create schemas and a database, meaning you have fulfilled the Model requirement of the MVC pattern.

- Svelte 5
- SvelteKit 2
- TypeScript
- Drizzle ORM
- SQLite
- TailwindCSS

## Setup

1. Clone the repository

2. Install dependencies:

```bash
npm install
```

3. Setup environment:

```bash
cp .env.example .env
```

4. Initialize database:

```bash
npm run db:push
```

5. Seed the database:

```bash
npm run db:seed
```

6. Start development server:

```bash
npm run dev
```

## API Rate Limiting

The AniList API has the following limitations:

- Normal rate: 90 requests/minute
- Current degraded state: 30 requests/minute
- Rate limit shown in X-RateLimit-Remaining header

## Notes

- No authentication implemented - uses default user (ID: 1)
- Prefetching enabled for performance but may trigger rate limits
- Local SQLite database persists user manga list entries
