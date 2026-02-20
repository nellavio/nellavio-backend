# ---- Build stage ----
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

# ---- Production stage ----
FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev

# Copy compiled application from builder
COPY --chown=node:node --from=builder /usr/src/app/build ./build

# Copy Prisma schema and migrations (needed for prisma migrate deploy)
COPY --chown=node:node --from=builder /usr/src/app/prisma ./prisma

USER node

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/health || exit 1

CMD ["node", "./build/src/server.js"]
