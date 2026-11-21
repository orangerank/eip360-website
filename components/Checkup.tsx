"use client";

import { useState } from "react";
import { BookButton } from "./BookButton";
import {
  answerChoices,
  checkupSections,
  scoreCheckup,
  type AnswerValue,
} from "@/lib/checkup";

export function Checkup() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [showError, setShowError] = useState(false);
  const section = checkupSections[step];
  const finished = step >= checkupSections.length;
  const score = finished ? scoreCheckup(answers) : null;

  function complete() {
    const ready = section.questions.every((question) => answers[question.id]);
    if (!ready) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setStep((value) => value + 1);
    document.getElementById("checkup")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div id="checkup" className="scroll-mt-28">
      <ol className="grid gap-3 sm:grid-cols-4" aria-label="Sections">
        {checkupSections.map((item, index) => (
          <li
            key={item.key}
            className={`border p-4 ${index === step ? "border-ink bg-white" : index < step ? "border-gold" : "border-ink/15"}`}
          >
            <p className="display text-[0.7rem] tracking-[0.12em] uppercase">Part {index + 1}</p>
            <p className="mt-2 font-semibold">{item.title}</p>
          </li>
        ))}
      </ol>

      {section ? (
        <div className="mt-8 border border-ink/10 bg-white p-6 sm:p-10">
          <p className="display text-[0.72rem] tracking-[0.14em] uppercase">
            Part {step + 1} of 4 · {section.title}
          </p>
          <h2 className="mt-3 text-[1.7rem]">{section.note}</h2>
          <ol className="mt-8 space-y-6">
            {section.questions.map((question, index) => (
              <li key={question.id} className="border-t border-ink/10 pt-5">
                <fieldset>
                  <legend className="text-[1.05rem]">
                    <span className="mr-2 font-semibold">{step * 6 + index + 1}.</span>
                    {question.q}
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {answerChoices.map((choice) => {
                      const selected = answers[question.id] === choice.value;
                      return (
                        <button
                          key={choice.value}
                          type="button"
                          aria-pressed={selected}
                          onClick={() =>
                            setAnswers((current) => ({ ...current, [question.id]: choice.value }))
                          }
                          className={`min-h-11 border px-4 text-[0.95rem] ${selected ? "border-ink bg-ink text-paper" : "border-ink/20"}`}
                        >
                          {choice.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </li>
            ))}
          </ol>
          {showError ? (
            <p className="mt-4 text-[#8d1d32]" role="alert">
              Answer each question before you continue.
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            {step > 0 ? (
              <button type="button" className="min-h-11 border border-ink/20 px-4" onClick={() => setStep((value) => value - 1)}>
                Back
              </button>
            ) : null}
            <button type="button" className="min-h-11 bg-ink px-5 text-[0.82rem] font-semibold tracking-[0.08em] text-paper uppercase" onClick={complete}>
              {step === 3 ? "See my score" : "Continue"}
            </button>
          </div>
        </div>
      ) : null}

      {score ? (
        <div className="mt-8 space-y-6">
          <div className="border border-gold/50 bg-bg p-8 text-paper">
            <p className="display text-[0.75rem] tracking-[0.14em] text-gold-bright uppercase">Your score</p>
            <p className="display mt-3 text-[4rem] leading-none">{score.total}</p>
            <p className="mt-2 text-gold-bright">{score.band.label} out of 100</p>
            <p className="mt-4 max-w-2xl text-paper/80">{score.band.note}</p>
            <p className="mt-3 text-[0.95rem] text-paper/60">
              EIP&apos;s bar for strong retention practice is 75 or higher.
              {score.unsure
                ? ` You answered "Not sure" ${score.unsure} ${score.unsure === 1 ? "time" : "times"}. Not knowing is a gap of its own.`
                : ""}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {score.bySection.map((sectionScore) => (
              <div key={sectionScore.key} className="border border-ink/10 bg-white p-5">
                <p className="text-[0.95rem]">{sectionScore.title}</p>
                <p className="display mt-2 text-[2rem]">{sectionScore.score}</p>
                <p className="mt-2 text-[0.85rem] text-ink/60">Strong is 75 or higher</p>
              </div>
            ))}
          </div>
          <div className="border border-ink/10 bg-white p-6 sm:p-8">
            <h2 className="text-[1.5rem]">Your three next best actions</h2>
            {score.gaps.length ? (
              <ol className="mt-5 grid gap-5 lg:grid-cols-3">
                {score.gaps.map((gap, index) => (
                  <li key={gap.id} className="border-t-2 border-gold pt-4">
                    <p className="display text-[1.4rem]">{index + 1}</p>
                    <p className="mt-2">{gap.action}</p>
                    {gap.tool ? <p className="mt-2 text-[0.9rem] text-ink/60">How EIP helps: {gap.tool}</p> : null}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-4">You answered yes to everything. The next step is proving it with your own data.</p>
            )}
          </div>
          <div className="border border-ink/10 p-6 sm:p-8">
            <h2 className="text-[1.7rem]">Want to see where your score comes from in your own data?</h2>
            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <BookButton tone="on-light">Book a 20-minute call</BookButton>
              <BookButton href="/turn-tax-calculator" variant="text" tone="on-light">
                Calculate your Turn Tax
              </BookButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
