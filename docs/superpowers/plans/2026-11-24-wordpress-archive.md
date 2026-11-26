# Plan: Collect everything from the old WordPress site

**Goal:** One complete, structured local archive of the old stovnerfrisbee.no WordPress site (posts, pages, images, files) that we can later pick content from: history, the archive page, old results, photos.

**Out of scope:** Changing the live site. Choosing what goes on the new site is a separate step later, and it follows `docs/design-principles.md`.

## What we know (checked 2026-11-24)

- The domain now points at Vercel, so the old WordPress site is no longer reachable there (`/wp-json/` returns 308).
- The Wayback Machine has **632 unique URLs** with status 200, from 2012 to 2026:
  - 183 HTML pages: about **85 posts** (`?p=`), about **45 pages** (`?page_id=`), plus month archives (`?m=2014–2019`), categories (`?cat=`), author pages and attachment pages
  - 126 images (JPEG/PNG), mostly from `wp-content/uploads` for 2016–2024
  - RSS feeds and a few `?rest_route=` JSON responses (2016–2018)
  - The rest is theme CSS/JS, which we don't need
- Some content from the club's Drive was already imported (commit `ec46862`).

## Sources, best first

1. **The original WordPress install on the Domeneshop web hotel.** The domain is still registered with Domeneshop (Norid registrar REG42); only DNS moved to Vercel, so the files and database are probably still there. This is the only complete source: drafts, every image at full size, and posts that Wayback never archived. WP admin can't be reached through the domain anymore, but it isn't needed:
   - Log in at domene.shop (customer number or email, or reset the password to the club email) → Webhotell → stovnerfrisbee.no
   - **Database:** open phpMyAdmin from the control panel → select the WordPress database → Export (SQL). This holds all posts, pages, dates and authors.
   - **Files:** under the FTP/SFTP section, copy the hostname and username. Then download `www/` (or the web root it names), above all `wp-content/uploads/`, using `sftp`/`rsync` or an app like Cyberduck.
   - Check whether the web hotel is still paid for and when it renews, so it isn't closed before the copy is done.
   - If this works, Wayback only fills the gaps.
2. **Wayback Machine.** This is the fallback, and it fills in what source 1 lacks. Steps below.
3. **RSS snapshots** (`/feed`, `?feed=rss2`). These hold full post text with exact dates, which helps where an HTML snapshot is broken.

## Steps (Wayback route)

All scripts go in `scripts/wp-archive/` and the output in `archive/wordpress/`. The output does **not** go in `static/`, so nothing is published by accident.

1. **List URLs.** Fetch the CDX index (`web.archive.org/cdx/search/cdx?url=stovnerfrisbee.no/*`), including `www.` and http/https variants. Group by canonical URL and save as `manifest.json`.
2. **Pick a snapshot.** For each post/page, take the newest snapshot with status 200 and keep a list of the others as a fallback.
3. **Download raw HTML** with the `id_` flag (`/web/<timestamp>id_/<url>`), which gives the original page without the Wayback toolbar. About 1 request per second, with retries and backoff.
4. **Find missing posts.** Month, category and front-page archives often contain full posts or excerpts. Collect every `?p=` ID they link to and download any not already covered. Record posts we never find.
5. **Extract content** into one Markdown file per post/page, with frontmatter: `title`, `date`, `author`, `categories`, `wp_id`, `source_url`, `snapshot`. Remove theme chrome such as menus, sidebars and comment forms.
6. **Images and files.** Collect every `wp-content/uploads` reference (img, href, srcset). Strip the WP size suffix (`-300x200`) to try the original first, and fall back to the largest version available. Also fetch PDFs and documents (results, bylaws, minutes).
7. **Rewrite links** inside the Markdown to the local image paths.
8. **Index for review.** Produce `archive/wordpress/index.csv` with date, type, title, word count, image count and a `keep?` column. The owner marks it up, and that list drives what goes on the new site.

## Verification

- Every post/page ID in `manifest.json` either has a Markdown file or is listed in `missing.md`.
- Spot-check 5 posts against Wayback in the browser.
- Image count matches the references found. Broken or missing images are listed.

## Things to watch

- **Privacy:** old posts may contain member lists, phone numbers, email addresses and photos of children. Keep the archive private and decide on each item before publishing.
- **Size and git:** text should go in the repo. Images may be large, so decide between committing them compressed (`scripts/compress-images.mjs`) and keeping them in Drive.
- **Rights:** photos may belong to members. Note the photographer where the post says who it is.
- Wayback snapshots can be months apart, so the newest snapshot of a page is not always the most complete one.

## Open questions for the owner

1. Does anyone (board, former webmaster, domain/hosting invoices) still have access to the old WordPress hosting? If so, source 1 saves most of the work.
2. Should the archive live in the repo (`archive/wordpress/`) or in the club's Drive?
3. Is there an end date? For example, only content from before the new site launched.
