import { describe, expect, it } from "vitest";
import { calculateSeedRequirement, ENGINE_PHASE, ENGINE_VERSION } from "./index";

describe("KisaanSahyog skills engine", () => {
  it("exposes the phase 6 engine metadata", () => {
    expect(ENGINE_VERSION).toBe("0.1.0");
    expect(ENGINE_PHASE).toBe(6);
  });

  it("calculates seed requirements for a plot", () => {
    expect(
      calculateSeedRequirement({ areaAcres: 2.5, seedRateKgPerAcre: 40 }),
    ).toEqual({
      seedKg: 100,
      seedRateKgPerAcre: 40,
      areaAcres: 2.5,
    });
  });

  it("rejects invalid plot areas", () => {
    expect(() =>
      calculateSeedRequirement({ areaAcres: 0, seedRateKgPerAcre: 40 }),
    ).toThrow(RangeError);
  });
});
