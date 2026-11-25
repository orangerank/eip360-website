import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculateTurnTax, formatMoney } from "./turn-tax.ts";

describe("Turn Tax", () => {
  it("prices a frontline role across the categories that apply", () => {
    const result = calculateTurnTax({
      positionIndex: 0,
      pay: 48000,
      payMode: "annual",
      headcount: 200,
      departures: 120,
    });
    assert.ok(result);
    assert.equal(result.position, "Frontline");
    assert.equal(result.perYear, result.perDeparture * 120);
    assert.ok(result.breakdown.length > 0);
    assert.ok(result.breakdown.length <= 13);
    assert.ok(result.perYear > result.perYearLow);
    assert.ok(result.perYear < result.perYearHigh);
    const weight = result.breakdown.reduce((sum, line) => sum + line.weight, 0);
    assert.ok(Math.abs(weight - 1) < 0.02);
  });

  it("annualizes hourly pay at 40 hours for 52 weeks", () => {
    const hourly = calculateTurnTax({
      positionIndex: 2,
      pay: 80,
      payMode: "hourly",
      headcount: 8,
      departures: 1,
    });
    const annual = calculateTurnTax({
      positionIndex: 2,
      pay: 80 * 40 * 52,
      payMode: "annual",
      headcount: 8,
      departures: 1,
    });
    assert.ok(hourly && annual);
    assert.equal(Math.round(hourly.perYear), Math.round(annual.perYear));
  });

  it("returns null until all four inputs are usable", () => {
    assert.equal(
      calculateTurnTax({
        positionIndex: 0,
        pay: 0,
        payMode: "annual",
        headcount: 10,
        departures: 2,
      }),
      null,
    );
  });

  it("formats whole dollars", () => {
    assert.equal(formatMoney(10432.4), "$10,432");
  });
});
