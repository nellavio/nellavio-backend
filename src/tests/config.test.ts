import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { validateEnv } from "../config.js";

describe("Config - validateEnv()", () => {
  let originalDatabaseUrl: string | undefined;
  let originalBetterAuthSecret: string | undefined;

  beforeEach(() => {
    originalDatabaseUrl = process.env.DATABASE_URL;
    originalBetterAuthSecret = process.env.BETTER_AUTH_SECRET;
  });

  afterEach(() => {
    process.env.DATABASE_URL = originalDatabaseUrl;
    process.env.BETTER_AUTH_SECRET = originalBetterAuthSecret;
  });

  it("throws error when DATABASE_URL is missing", () => {
    delete process.env.DATABASE_URL;

    expect(() => validateEnv()).toThrow("DATABASE_URL");
  });

  it("throws error when BETTER_AUTH_SECRET is missing", () => {
    delete process.env.BETTER_AUTH_SECRET;

    expect(() => validateEnv()).toThrow("BETTER_AUTH_SECRET");
  });

  it("throws error with a list of all missing variables at once", () => {
    delete process.env.DATABASE_URL;
    delete process.env.BETTER_AUTH_SECRET;

    expect(() => validateEnv()).toThrow("DATABASE_URL");
    try {
      validateEnv();
    } catch (error) {
      const message = (error as Error).message;
      expect(message).toContain("DATABASE_URL");
      expect(message).toContain("BETTER_AUTH_SECRET");
    }
  });

  it("returns config when everything is set", () => {
    const config = validateEnv();

    expect(config).toHaveProperty("DATABASE_URL");
    expect(config).toHaveProperty("BETTER_AUTH_SECRET");
    expect(config.DATABASE_URL).toBe(process.env.DATABASE_URL);
    expect(config.BETTER_AUTH_SECRET).toBe(process.env.BETTER_AUTH_SECRET);
  });
});
