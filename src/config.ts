/**
 * Environment variables validation
 * Validates required environment variables at startup
 * Implements fail-fast pattern for missing configuration
 */

interface EnvConfig {
  DATABASE_URL: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  NODE_ENV?: string;
  PORT?: string;
  HOST?: string;
  ALLOWED_ORIGINS?: string;
}

/**
 * Validate environment variables
 * @throws {Error} If required environment variables are missing
 */
export const validateEnv = (): EnvConfig => {
  const requiredVars = [
    "DATABASE_URL",
    "BETTER_AUTH_SECRET",
  ] as const;

  const missing: string[] = [];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}\n` +
        `Please check your .env file and ensure all required variables are set.`
    );
  }

  // Set defaults for optional variables
  const config: EnvConfig = {
    DATABASE_URL: process.env.DATABASE_URL!,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "http://localhost:4000/api/auth",
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || "4000",
    HOST: process.env.HOST || "0.0.0.0",
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "",
  };

  return config;
};

/**
 * Get validated environment config
 * Safe to call after validateEnv()
 */
export const getEnvConfig = (): EnvConfig => {
  return {
    DATABASE_URL: process.env.DATABASE_URL!,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "http://localhost:4000/api/auth",
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || "4000",
    HOST: process.env.HOST || "0.0.0.0",
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "",
  };
};
