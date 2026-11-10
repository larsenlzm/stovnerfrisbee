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

## Norges Cup subdomain

The Norges Cup #4 page is served at `https://nc.stovnerfrisbee.no` (root rewritten to `/norges-cup`; other paths redirect to the main site). One-time owner setup:

1. Vercel: Project > Settings > Domains > add `nc.stovnerfrisbee.no`.
2. At the DNS host, add the record Vercel shows (normally `CNAME nc -> cname.vercel-dns.com`).
3. Wait for Vercel to show "Valid Configuration", then open `https://nc.stovnerfrisbee.no`.

Before DNS is live, the page is available at `/norges-cup` on any deployment.

Test the host routing before DNS is live:

```sh
npm run build && npm run preview
curl -H 'Host: nc.stovnerfrisbee.no' http://localhost:4173/            # the Norges Cup page
curl -sI -H 'Host: nc.stovnerfrisbee.no' http://localhost:4173/om-klubben   # 308 to stovnerfrisbee.no
```

Post-deploy checklist:

- `https://nc.stovnerfrisbee.no` shows the page.
- `nc.stovnerfrisbee.no/nc-share.jpg`, `/rocker.jpg` and `/stovnerlogo.jpg` load (`nc-share.jpg` is the share image).
- `nc.stovnerfrisbee.no/om-klubben` redirects to the main site.
- `nc.stovnerfrisbee.no/norges-cup-4.ics` downloads.
- PostHog shows events with `$host` = `nc.stovnerfrisbee.no`.
- Open `nc.stovnerfrisbee.no/?notrack` once on your own devices.
