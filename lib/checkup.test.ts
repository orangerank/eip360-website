import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkupQuestions, scoreCheckup, type AnswerValue } from "./checkup.ts";

describe("Retention Checkup", () => {
  it("has 24 questions in four parts", () => {
    assert.equal(checkupQuestions.length, 24);
  });

  it("scores all yes answers at 100", () => {
    const answers = Object.fromEntries(
      checkupQuestions.map((question) => [question.id, "yes" as AnswerValue]),
    );
    const score = scoreCheckup(answers);
    assert.equal(score.total, 100);
    assert.equal(score.band.label, "Strong");
    assert.equal(score.gaps.length, 0);
  });

  it("scores all no answers at 0 and returns three actions", () => {
    const answers = Object.fromEntries(
      checkupQuestions.map((question) => [question.id, "no" as AnswerValue]),
    );
    const score = scoreCheckup(answers);
    assert.equal(score.total, 0);
    assert.equal(score.band.label, "At risk");
    assert.equal(score.gaps.length, 3);
  });

  it("treats not sure as zero points", () => {
    const answers = Object.fromEntries(
      checkupQuestions.map((question) => [question.id, "unsure" as AnswerValue]),
    );
    const score = scoreCheckup(answers);
    assert.equal(score.total, 0);
    assert.equal(score.unsure, 24);
  });
});
