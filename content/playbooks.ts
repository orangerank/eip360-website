export type PlaybookStatus = "open" | "paid";

export type PlaybookCard = {
  slug: string;
  name: string;
  blurb: string;
  status: PlaybookStatus;
  price?: string;
};

/** Open and paywalled playbooks only. Unfinished titles stay off the shelf. */
export const playbookCatalog: PlaybookCard[] = [
  {
    slug: "home-health-clinician",
    name: "The Home Health Clinician Retention Playbook",
    blurb: "How to keep the nurses and therapists your agency cannot grow without",
    status: "open",
  },
  {
    slug: "public-utilities",
    name: "The Public Utility Retention Playbook",
    blurb: "Keeping the lineworkers, operators and engineers who keep the lights on",
    status: "paid",
    price: "$495",
  },
  {
    slug: "oil-and-gas",
    name: "The Oil and Gas Retention Playbook",
    blurb: "Keeping field crews and technical talent through the cycles",
    status: "paid",
    price: "$495",
  },
  {
    slug: "manufacturing",
    name: "The Manufacturing Retention Playbook",
    blurb: "Keeping production crews, supervisors and skilled operators",
    status: "paid",
    price: "$495",
  },
  {
    slug: "construction",
    name: "The Construction Retention Playbook",
    blurb: "Keeping crews and foremen across project cycles",
    status: "paid",
    price: "$495",
  },
  {
    slug: "executive-sales",
    name: "The Executive Sales Retention Playbook",
    blurb: "Keeping the sales leaders who carry your revenue",
    status: "paid",
    price: "$495",
  },
  {
    slug: "nuclear-operators",
    name: "The Nuclear Operator Retention Playbook",
    blurb: "How to keep the licensed and non-licensed operators your plants cannot run without",
    status: "open",
  },
  {
    slug: "contact-centers",
    name: "The Contact Center Agent Retention Playbook",
    blurb: "How to stop rehiring your frontline every year, in-house or outsourced",
    status: "open",
  },
  {
    slug: "private-equity",
    name: "The Portfolio Talent Retention Playbook",
    blurb: "How to keep the people your value-creation plan depends on, from diligence to exit",
    status: "open",
  },
];
