# stovnerfrisbee.no

Website for [Stovner Frisbeeklubb](https://stovnerfrisbee.no) — one of Norway's oldest disc sports clubs, founded in 1985.

## Stack

- [SvelteKit](https://kit.svelte.dev/) (Svelte 5)
- [Tailwind CSS v4](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com/) via `@sveltejs/adapter-vercel`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Type checking

```bash
npm run check
```

## Project structure

```
src/
  lib/
    components/   # Reusable UI components (Nav, Footer, EventCard, ...)
    data/         # Site content (events, board members, social links)
  routes/         # Pages (/, /om-klubben, /banene, /arrangementer, /bli-medlem, /kontakt)
```
