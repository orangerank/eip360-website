/**
 * Site-wide copy, navigation, and the open items Brett still needs to confirm.
 * Change values here. Do not scatter placeholders through page files.
 *
 * Language rules (apply everywhere):
 * - Never name the founder's former employer, its cities, or its vendors.
 * - Fortune 10 results always carry the attribution line below.
 * - The 20-minute call can be no-cost. Do not call the diagnostic or the Snapshot free.
 * - Say "seven standard data fields".
 * - Primary button: "Book a 20-minute call".
 */

/**
 * Proposed logo Chris chose. Not final until EIP signs off.
 * Light gold is for paper backgrounds. The on-dark file is for the header and other dark surfaces.
 */
export const proposedLogo = {
  status: "proposed" as const,
  note: "Chris chose this mark. It still needs EIP sign-off and is not the final logo.",
  light: "/brand/eip-logo.svg",
  onDark: "/brand/eip-logo-on-dark.svg",
  mark: "/brand/eip-logo-mark.svg",
} as const;

export const company = {
  name: "Experience Improvement Partners",
  short: "EIP",
  legal: "Experience Improvement Partners LLC",
  email: "hello@eip360.com",
  office: "EIP Office, Dallas, Texas",
  linkedIn: "https://www.linkedin.com/company/113434525",
  calendly: "https://calendly.com/useeip-45",
  tagline: "Advisory first. Technology backed.",
} as const;

/**
 * Set NEXT_PUBLIC_SITE_URL on the review host.
 * Leave indexable false until this site replaces the current eip360.com.
 */
export const siteMeta = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://eip360.com",
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
  reviewBanner: true,
} as const;

/** Open item 1. Recommended default. Swap this string to change the homepage H1. */
export const homepageHeadline =
  "We show you who is leaving, what it costs, and how to stop it.";

export const attribution =
  "Results from our founder's work at a Fortune 10 company, not EIP client results. Those were that company's results, not a forecast.";

export const resultsAttribution =
  "These are results from our founder's career at a Fortune 10 company, where Brett led the work. They are not EIP client results. Those were that company's results, not a forecast. Every number comes with its scope.";

export const bookStatus =
  "Read it here, one chapter at a time. Print edition expected Summer 2027.";

/**
 * Open item 4. Set to a full https URL when Brett supplies it.
 * Null renders a pending note instead of a guessed profile.
 */
export const brettLinkedIn: string | null = null;

/**
 * Open item 8. Example inputs for the homepage Turn Tax teaser.
 * Labeled "Example" on the page so visitors do not treat the figure as theirs.
 */
export const turnTaxExample = {
  roleIndex: 0,
  annualPay: 48000,
  peopleWhoLeft: 120,
} as const;

/**
 * Open item 9. /for-ai on the live site says 10.
 * /team lists 6 leaders and 6 Council members. Confirm before launch.
 */
export const councilHeadcountForFactsPage = 10;

/**
 * Open item 6. Spec copy names Tony Fox as the host. Confirm before launch.
 */
export const callHost = {
  name: "Tony Fox",
  title: "Chief Growth Officer",
} as const;

export const cta = {
  eyebrow: "Start with a conversation",
  headline: "Start with a 20-minute call.",
  body: "Tell us where turnover hurts. We will show you how we would price it and find the cause. If it is a fit, we may invite you to a Retention Snapshot: one file, seven standard data fields, names coded before anyone looks, first numbers in about 7 days.",
  micro:
    "No contract. No cost for the call. If it doesn't surprise you, walk away.",
  button: "Book a 20-minute call",
  href: "/contact#book",
} as const;

export const heroMicro =
  "Starts with a 20-minute call. No contract. No cost. If it doesn't surprise you, walk away.";

export const supportingQuestions = [
  "High-volume turnover, and the cost never shows up in one place?",
  "Losing the clinicians, operators, and lineworkers you cannot replace?",
  "Roles with no backfill, and another seat about to empty?",
] as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const primaryNav: NavItem[] = [
  {
    label: "Approach",
    href: "/approach",
    children: [
      { label: "How it works", href: "/approach#how" },
      { label: "The kit", href: "/approach#kit" },
      { label: "How EIP compares", href: "/compare" },
      { label: "Data security", href: "/security" },
    ],
  },
  { label: "Results", href: "/results" },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Power Utility", href: "/industries#power-utility" },
      { label: "Healthcare", href: "/industries#healthcare" },
      { label: "Warehouse and logistics", href: "/industries#warehouse-logistics" },
      { label: "Contact centers", href: "/industries#contact-centers" },
      { label: "Manufacturing", href: "/industries#manufacturing" },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
    children: [
      { label: "The Book", href: "/white-papers" },
      { label: "Playbooks", href: "/industry-playbooks" },
      { label: "Articles", href: "/articles" },
      { label: "Media", href: "/media" },
    ],
  },
  { label: "Team", href: "/team" },
];

export const tools = [
  {
    slug: "flight-risk-score",
    name: "Flight Risk Score™",
    line: "Who needs a conversation next",
    href: "/tools/flight-risk-score",
  },
  {
    slug: "turn-tax",
    name: "Turn Tax™",
    line: "What turnover costs you",
    href: "/tools/turn-tax",
  },
  {
    slug: "honest-read",
    name: "Honest Read™",
    line: "What will keep your people",
    href: "/tools/honest-read",
  },
  {
    slug: "hire-smart",
    name: "Hire Smart™",
    line: "Hire people who stay",
    href: "/tools/hire-smart",
  },
  {
    slug: "retention-dashboard",
    name: "Retention Dashboard",
    line: "What our advisors see each month",
    href: "/tools/retention-dashboard",
  },
  {
    slug: "competitor-intel",
    name: "Competitor Intel",
    line: "Who is hiring your people",
    href: "/tools/competitor-intel",
  },
] as const;

export const situations = [
  {
    title: "High-volume turnover",
    body: "Teams that turn over fast, where refilling the same seats never stops and the cost never shows up in one place.",
  },
  {
    title: "Losing critical people",
    body: "Companies losing the operators, clinicians, engineers and leaders they cannot afford to lose.",
  },
  {
    title: "No backfill for critical people",
    body: "Roles that take months to refill, or cannot be refilled at all, so every departure leaves a hole.",
  },
] as const;

export const timeline = [
  { when: "7 days", what: "Your first numbers" },
  { when: "30 days", what: "Your plan, with dollars attached" },
  { when: "90 days", what: "Results you can measure" },
] as const;

export const proofTiles = [
  {
    big: "97% to 51%",
    label: "Distribution center turnover",
    scope: "About 600 employees",
  },
  {
    big: "$104M",
    label: "Operating profit (EBIT)",
    scope: "Over two years",
  },
  {
    big: "NPS 24 to 81",
    label: "Net Promoter Score",
    scope: "Over two years",
  },
  {
    big: "6 to 3 weeks",
    label: "Time to start a new hire",
    scope: "Rolled out to 1,200+ stores",
  },
] as const;
