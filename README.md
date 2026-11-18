# Experience Improvement Partners website

Review build of the EIP site. The live site at [eip360.com](https://eip360.com) is untouched. This project is the reorganized site from the November 17, 2026 build specification, using copy and assets from the live site.

Positioning: Advisory first. Technology backed.

## Stack

- Next.js (App Router) and React
- Tailwind CSS 4
- TypeScript
- Static pages, with two small server actions for the demo password and the Snapshot invitation code
- Ready for Vercel. No database.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm test
npm run check:language
npm run build
```

`npm test` checks the Turn Tax math and the 24-question Retention Checkup scoring. `npm run check:language` fails if banned phrases show up in source, JSON, or `llms.txt`.

## Deploy

Connect the repo to Vercel and deploy the `main` branch of this project (or the review branch) as its own project. Do not point the production domain at this build until Brett signs off.

Optional environment variables:

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin. Defaults to `https://eip360.com`. Set this to the review URL until launch. |
| `NEXT_PUBLIC_INDEXABLE` | Set to `true` only at launch. Until then robots disallow the whole site so this build does not compete with the live site. |
| `DEMO_PASSWORD` | Password for `/demo`. Shared with a visitor after they book. Never commit it. |
| `FREE_POC_CODE` | Invitation code for `/free-poc`. Never commit it. |

The contact form opens the visitor's email app to `hello@eip360.com`. An email provider is not connected. Calendly stays embedded on `/contact#book` (`https://calendly.com/useeip-45`). In Calendly, set the after-booking redirect to this site's `/thanks` when you are ready. The confirmation email, including the demo password, is sent by Calendly, not by this repo.

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
7. Demo password: set `DEMO_PASSWORD` on the host. Do not put it in git or on `/thanks`.
8. Homepage Turn Tax example inputs are Frontline, $48,000, 120 departures, labeled Example. Replace `turnTaxExample` in `content/site.ts`.
9. Facts page uses a Council headcount of 10, matching the current `/for-ai`. The team page lists 6 leaders and 6 Council members. Confirm the number.
10. Platform logins and who publishes redirects are an operations item, not a code item. Redirects are in `next.config.ts`.
11. Book wording in use: chapters are readable now; print edition expected Summer 2027.
12. Unfinished playbooks are hidden. Paywalled titles stay, with a contact link. Confirm that choice.
13. Snapshot page still includes the current line "with no invoice". Confirm the wording. The file upload to the production intake worker is not wired on this review build.
14. Analytics events are not installed. Add them when access is available: calculator completed, result call clicked, checkup completed, call button clicked, `/thanks` viewed.
15. No email tool yet. The message form uses a mailto link. A PDF of the Turn Tax breakdown is not gated.

The review banner at the top of every page is `siteMeta.reviewBanner` in `content/site.ts`. Turn it off at launch, and set `NEXT_PUBLIC_INDEXABLE=true`.

## Language

- The former employer is not named. One media item keeps only the Apple Podcasts link.
- Founder results carry the attribution line.
- The call can be no-cost. The Snapshot is by invitation.
- Data request language says "seven standard data fields".
- One sentence in the book file was changed from a word the language check rejects to "promise". The figures in the book are otherwise as published.
