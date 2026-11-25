import sections from "../content/checkup.json" with { type: "json" };

export type AnswerValue = "yes" | "partly" | "no" | "unsure";

export const answerChoices: { value: AnswerValue; label: string; pts: number }[] = [
  { value: "yes", label: "Yes", pts: 2 },
  { value: "partly", label: "Partly", pts: 1 },
  { value: "no", label: "No", pts: 0 },
  { value: "unsure", label: "Not sure", pts: 0 },
];

export type CheckQuestion = {
  id: string;
  q: string;
  action: string;
  tool?: string;
  weight: number;
};

export type CheckSection = {
  key: string;
  title: string;
  note: string;
  questions: CheckQuestion[];
};

export const checkupSections = sections as CheckSection[];

export const checkupQuestions = checkupSections.flatMap((section) => section.questions);

const bands = [
  {
    min: 75,
    label: "Strong",
    note: "You have the basics in place. The gains now come from seeing risk earlier and acting on it person by person.",
  },
  {
    min: 50,
    label: "Building",
    note: "Some of the right pieces are there, but gaps are letting people leave who did not have to.",
  },
  {
    min: 0,
    label: "At risk",
    note: "Turnover is likely costing you more than you can see. The good news: the first fixes are usually fast and low cost.",
  },
];

function points(value: AnswerValue | undefined) {
  return answerChoices.find((choice) => choice.value === value)?.pts ?? 0;
}

export function scoreCheckup(answers: Record<string, AnswerValue | undefined>) {
  const total = Math.round(
    (checkupQuestions.reduce((sum, question) => sum + points(answers[question.id]), 0) /
      (checkupQuestions.length * 2)) *
      100,
  );
  const bySection = checkupSections.map((section) => ({
    key: section.key,
    title: section.title,
    score: Math.round(
      (section.questions.reduce((sum, question) => sum + points(answers[question.id]), 0) /
        (section.questions.length * 2)) *
        100,
    ),
  }));
  const gaps = checkupQuestions
    .map((question) => ({
      question,
      gap: (2 - points(answers[question.id])) * question.weight,
    }))
    .filter((item) => item.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3)
    .map((item) => item.question);
  const unsure = checkupQuestions.filter((question) => answers[question.id] === "unsure").length;
  const band = bands.find((item) => total >= item.min) ?? bands[bands.length - 1];
  return { total, bySection, gaps, band, unsure };
}
