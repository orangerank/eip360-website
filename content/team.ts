export type Person = {
  name: string;
  role: string;
  group: "Leadership" | "Council";
  bio: string;
  photo: string;
};

export const people: Person[] = [
  {
    name: "Brett Kiley",
    role: "Founder and CEO",
    group: "Leadership",
    bio: "20 years at a Fortune 10 company across retail, distribution, call centers, and executive teams.",
    photo: "/assets/council-sm/brett-kiley.webp",
  },
  {
    name: "Tony Fox",
    role: "Chief Growth Officer",
    group: "Leadership",
    bio: "Former GM and CRO at SmartSearch, after 20+ years in banking, fintech, and BI.",
    photo: "/assets/council-sm/tony-fox.webp",
  },
  {
    name: "Jesse McCarty",
    role: "Chief Human Resources Officer",
    group: "Leadership",
    bio: "15+ years scaling people operations for up to 60,000 employees.",
    photo: "/assets/council-sm/jesse-mccarty.webp",
  },
  {
    name: "Lilian Jiang",
    role: "Chief Technology Officer",
    group: "Leadership",
    bio: "6+ years in data science for fintech and SaaS.",
    photo: "/assets/council-sm/lilian-jiang.webp",
  },
  {
    name: "Justin Fair",
    role: "Chief Security Officer",
    group: "Leadership",
    bio: "Virtual CISO and Principal Consultant at Clearwater, guiding organizations on cybersecurity risk and compliance.",
    photo: "/assets/council-sm/justin-fair.webp",
  },
  {
    name: "Blake Gibson",
    role: "Chief Legal Counsel",
    group: "Leadership",
    bio: "Technology and AI attorney and founder of Gibson Counsel. Former GC, COO, and Head of Product.",
    photo: "/assets/council-sm/blake-gibson.webp",
  },
  {
    name: "Frank Wassenbergh",
    role: "CX Teams",
    group: "Council",
    bio: "Technology consulting, telecom, and customer experience for more than 20 years.",
    photo: "/assets/council-sm/frank-wassenbergh.webp",
  },
  {
    name: "Vanessa Menario",
    role: "Contact Centers",
    group: "Council",
    bio: "Scaled programs from 55 to 1,800 FTEs. Cut attrition 59% in 90 days.",
    photo: "/assets/council-sm/vanessa-menario.webp",
  },
  {
    name: "Scott Johnson",
    role: "CEO and Operator Advisor",
    group: "Council",
    bio: "30+ years as a CEO and business operator.",
    photo: "/assets/council-sm/scott-johnson.webp",
  },
  {
    name: "Veronica Verhoff",
    role: "HR",
    group: "Council",
    bio: "18+ years in talent strategy and workforce optimization.",
    photo: "/assets/council-sm/veronica-verhoff.webp",
  },
  {
    name: "Lissa Campbell",
    role: "Healthcare",
    group: "Council",
    bio: "20 years in sales, marketing, and business development.",
    photo: "/assets/council-sm/lissa-campbell.webp",
  },
  {
    name: "Derek Vitatoe",
    role: "Labor",
    group: "Council",
    bio: "Former Division HR Director at a Fortune 5 company, with 25+ years behind that.",
    photo: "/assets/council-sm/derek-vitatoe.webp",
  },
];

export const founderBio = [
  "Brett spent 20 years at a Fortune 10 company across retail, distribution, call centers, and executive teams. There, he led the work that cut distribution center turnover from 97% to 51% and kept thousands of frontline people in their seats. Those were that company's results, not a forecast.",
  "He founded Experience Improvement Partners to bring the same method to companies with large frontline workforces: find who is likely to leave, put a price on it, and stay until the number moves. He is the author of The Retention Advantage.",
];
