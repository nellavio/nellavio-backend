import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "./db.js";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:4000/api/auth",

  // Database configuration with Prisma adapter
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // Email/Password authentication
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 128,
    autoSignIn: true,
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  // Trusted origins (CORS)
  trustedOrigins: ["http://localhost:3000", "http://localhost:4000"],

  // Email verification (placeholder)
  emailVerification: {
    sendVerificationEmail: async ({
      user: _user,
      url: _url,
      token: _token,
    }) => {
      // TODO: Implement email sending (e.g. SendGrid, AWS SES)
    },
    sendOnSignUp: false,
  },
});
