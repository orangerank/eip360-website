# Experience Improvement Partners website

Review build of the EIP site. The live site at [eip360.com](https://eip360.com) is untouched. This project is the reorganized site from the November 17, 2026 build specification, using copy and assets from the live site.

Positioning: Advisory first. Technology backed.

## Stack

- Next.js (App Router) and React, adapted for Cloudflare Workers with `@opennextjs/cloudflare`
- Tailwind CSS 4
- TypeScript
- Mostly static pages, with two server actions for the demo password and the Snapshot invitation code
- No database. No R2 bucket. Images are served as files, so Cloudflare Image Resizing is not required.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm test
npm run check:language
npm run cf:build
```

`npm run build` is only the Next.js compile. Cloudflare deploys use `npm run cf:build`, which runs that compile and then the OpenNext adapter.

`npm test` checks the Turn Tax math and the 24-question Retention Checkup scoring. `npm run check:language` fails if banned phrases show up in source, JSON, or `llms.txt`.

Local Workers runtime (after a build):

```bash
cp .dev.vars.example .dev.vars
# put throwaway values in .dev.vars, then:
npx opennextjs-cloudflare preview
```

That serves the built worker on http://localhost:8787. `.dev.vars` is gitignored.

## Cloudflare preview

Workers Builds is connected to this repo. Its production branch is `cursor/eip-website-rebuild-7097`, and the Worker name in `wrangler.jsonc` is `eip360-website`.

- Build: `npm run cf:build`
- Deploy: `npx wrangler deploy --keep-vars`
- Build variable `NODE_VERSION` = `22`
- `NEXT_PUBLIC_INDEXABLE` stays unset, so the preview is not indexed
- `DEMO_PASSWORD` and `FREE_POC_CODE` are Cloudflare secrets, still pending from Brett

## Deploy on Cloudflare

Create a **new Worker** in the same Cloudflare account that already hosts eip360.com. Do not attach the `eip360.com` route to this Worker until Brett signs off. The live site stays on its current Worker.

Dashboard path: Workers & Pages → Create → Import a repository → GitHub → `orangerank/eip360-website`.

Do not accept an automatic Next.js preset. That path uses a different adapter. This repo already has `wrangler.jsonc` for the OpenNext adapter. If the setup screen offers a framework preset, choose none / custom and enter the commands below. You can also set them later under the Worker → Settings → Build.

| Setting | Value |
| --- | --- |
| Production branch | `cursor/eip-website-rebuild-7097` (the connected review branch; move this to `main` only at launch) |
| Root directory | repository root (leave blank) |
| Build command | `npm run cf:build` |
| Deploy command | `npx wrangler deploy --keep-vars` |
| Preview command | `npx wrangler preview` |
| Node.js | 22. Set the build variable `NODE_VERSION` to `22`. `package.json` also sets `"engines": { "node": "22" }`. |
| Non-production branch builds | On, so pull requests get a preview URL |

`--keep-vars` is required. A deploy without it deletes the runtime secrets you set in the dashboard.

### Build variables

Worker → Settings → Build → Build variables and secrets. These are available only while the site is compiling. `NEXT_PUBLIC_*` values are baked into the pages at build time.

| Name | Preview builds | Production builds |
| --- | --- | --- |
| `NODE_VERSION` | `22` | `22` |
| `NEXT_PUBLIC_SITE_URL` | the preview hostname, once Cloudflare shows it. Until then, leave unset. Canonicals fall back to `https://eip360.com`. | the public URL. Leave as `https://eip360.com` only when this Worker is the live site. |
| `NEXT_PUBLIC_INDEXABLE` | leave unset | leave unset until launch, then `true` |

While `NEXT_PUBLIC_INDEXABLE` is unset, `/robots.txt` disallows the whole site and pages send `noindex`. That is the preview default.

### Runtime secrets

Worker → Settings → Variables and Secrets. Add the same names for Production and for Preview. Type: **Secret** (encrypted). Do not put the values in git, in Build variables, or in `wrangler.jsonc`.

| Name | Used by |
| --- | --- |
| `DEMO_PASSWORD` | `/demo` server action |
| `FREE_POC_CODE` | `/free-poc` server action |

The Worker reads them from `process.env` at request time. If a secret is missing, the form stays locked and says the value has not been configured.

Preview secrets are configured with the preview, not by the production secret list. In the dashboard use the Preview environment (Settings → Variables and Secrets, or `npx wrangler preview secret put DEMO_PASSWORD`) so a preview URL can open the gates. The password still never appears in the repository or on `/thanks`.

This Worker does not need a KV namespace, an R2 bucket, or an Images binding. The free Workers plan is enough.

The booking button goes to `/contact#book`, which is a form (name, company, email, phone, and at least one weekday window), not Calendly. A separate “Or write to us” note still opens the visitor's email app to `hello@eip360.com`.

The webhook JSON adds `availability` and `visitor_timezone` to the v0.1 schema. Each window is `{ "day": "tue", "block": "morning", "start_ct": "09:00", "end_ct": "12:00" }`. Days are `mon` through `fri`. Morning is 9:00 AM–12:00 PM Central (`09:00`–`12:00`). Afternoon is 1:00–5:00 PM Central (`13:00`–`17:00`). `visitor_timezone` is the IANA zone from the browser, such as `America/Chicago`. The server checks that at least one known window is present and that the time zone is real. After a successful submit the visitor goes to `/thanks`. The confirmation says they will receive an email with the meeting time and a calendar invite. This Worker does not read a calendar.

### Next phase: specific times from Tony's calendar

Not built. There is no calendar connection in this repo. The current form at `/contact#book` still collects weekday morning and afternoon windows. An unlisted mockup of the later slot list is at `/contact-mockup`. It uses hardcoded example times, is not in the navigation, and does not submit or store anything.

When this is built, the booking page asks the Worker for Tony Fox's open times. The Worker reads his Outlook calendar through Microsoft Graph, caches that answer for one to two minutes, and returns only a short list: about two or three days in a week, and two or three times on a day, so the page does not look like a sales-development booking grid. At the moment of booking the Worker checks that slot again, and refuses it if it is no longer free, so two visitors cannot take the same time.

### Booking form environment

All of these are Worker secrets or runtime variables. Do not put them in git. Preview (a `*.workers.dev` host, including localhost) uses Cloudflare's documented Turnstile test keys when the real keys are unset. Any other host refuses the form until the real keys are set.

| Name | Required | Purpose |
| --- | --- | --- |
| `TURNSTILE_SITE_KEY` | Production yes. Preview no. | Turnstile widget. Public. |
| `TURNSTILE_SECRET_KEY` | Production yes. Preview no. | Turnstile siteverify. Secret. |
| `WEBHOOK_URL` | No | Signed POST target. If unset, the Worker stores the submission and logs `webhook not configured`. The visitor still sees the confirmation. |
| `WEBHOOK_SECRET` | When `WEBHOOK_URL` is set | HMAC-SHA256 key. Signature header is `X-EIP-Signature: sha256=<hex>` over `<unix timestamp>.<raw JSON body>`. `X-EIP-Timestamp` carries the timestamp. |

Submissions are stored in the `BOOKING` Durable Object (`BookingStore` in `wrangler.jsonc`). The same email inside 24 hours is stored as a duplicate and is not posted again. That window is a proposed default. The webhook JSON uses `client_id` `EIP` and the schema in the booking form spec v0.1. The consent sentence is proposed and lives in `lib/booking.ts`.

## Redirects

Permanent (301):

| Old | New |
| --- | --- |
| `/advantage` | `/approach` (`#how` and `#what-you-get` exist on the new page; browsers keep the fragment) |
| `/proof` | `/results` |
| `/who-we-serve` | `/industries` |
| `/council` | `/team` |
| `/tools` | `/approach#kit` |
| `/publications` | `/insights` |

Unfinished playbook URLs redirect back to `/industry-playbooks` and are not linked: nurses, cruise lines, warehouse and logistics, hospitality, skilled trades, senior living.

`/thanks` and `/prepare` are noindex. `/demo` is noindex.

## What is built

- Header and footer from the spec, sticky header, call button visible on mobile outside the menu
- Sitewide call band above the footer
- Homepage, ten sections, with the attribution line next to the proof tiles
- Approach, Results, Industries, Team, Contact, thanks, prepare
- Turn Tax calculator (four inputs, 13 categories, three roles) and the homepage example teaser
- Retention Checkup (24 questions, score out of 100, three next actions)
- Insights, the book (chapters on the site), playbooks (open titles in full, paywalled titles as a price and a note to contact Tony)
- Articles, media, six tool pages, comparison, security, privacy, terms, partners, for AI, `llms.txt`, sitemap
- Demo and Snapshot gates. Secrets come from the environment, not the repo

Every primary button goes to `/contact#book`. The Turn Tax result button says "Book a 20-minute call to see this on your own data".

## Placeholders Brett still owns

All of these live in `content/site.ts` unless noted.

1. Homepage headline. Default in use: "We show you who is leaving, what it costs, and how to stop it."
2. Draft copy from the spec is in the pages (problem section, founder bio, offer, confirmation, calculator result, checkup result, prepare). Approve or edit in place.
3. Headshots are the images already published on eip360.com. A few are low resolution. Replace files in `public/assets/council-sm/`.
4. Brett's personal LinkedIn URL is null. The team page says the link is pending. Company LinkedIn is set.
5. The homepage hero is a sample product panel (Flight Risk Score, Turn Tax, Retention Dashboard) with fictional roles and sites, labeled Sample data. A separate hero photograph is not used.
6. Calendly host copy names Tony Fox and a 20-minute call. Confirm host, length, and event name, then set the redirect and confirmation email in Calendly.
7. Demo password: set the `DEMO_PASSWORD` Worker secret. Do not put it in git or on `/thanks`. The Snapshot code is the `FREE_POC_CODE` secret.
8. Homepage Turn Tax example inputs are Frontline, $48,000, 120 departures, labeled Example. Replace `turnTaxExample` in `content/site.ts`.
9. Facts page uses a Council headcount of 10, matching the current `/for-ai`. The team page lists 6 leaders and 6 Council members. Confirm the number.
10. Platform logins and who publishes redirects are an operations item, not a code item. Redirects are in `next.config.ts`.
11. Book wording in use: chapters are readable now; print edition expected Summer 2027.
12. Unfinished playbooks are hidden. Paywalled titles stay, with a contact link. Confirm that choice.
13. Snapshot page still includes the current line "with no invoice". Confirm the wording. The file upload to the production intake worker is not wired on this review build.
14. Analytics events are not installed. Add them when access is available: calculator completed, result call clicked, checkup completed, call button clicked, `/thanks` viewed.
15. No email tool yet. The message form uses a mailto link. A PDF of the Turn Tax breakdown is not gated.
16. Logo in `public/brand/` is proposed. Chris chose it. EIP has not signed off, so it is not final. `proposedLogo.status` in `content/site.ts` is `"proposed"`.

The review banner at the top of every page is `siteMeta.reviewBanner` in `content/site.ts`. Turn it off at launch, and set the production build variable `NEXT_PUBLIC_INDEXABLE` to `true`.

## Language

- The former employer is not named. One media item keeps only the Apple Podcasts link.
- Founder results carry the attribution line.
- The call can be no-cost. The Snapshot is by invitation.
- Data request language says "seven standard data fields".
- One sentence in the book file was changed from a word the language check rejects to "promise". The figures in the book are otherwise as published.
