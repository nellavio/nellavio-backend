# Spireflow backend

Open source backend for Spireflow dashboard

## Tech stack

**Core:**
- Node.js 20+ with TypeScript 5.9
- Fastify 5.6 - High-performance web framework (3x faster than Express)
- PostgreSQL - Primary database
- Prisma 6.18 - Type-safe ORM with migrations

**GraphQL:**
- Mercurius 16.5 - Official Fastify GraphQL plugin
- GraphQL 16.11 - Schema-first API design

**Authentication:**
- Better Auth 1.3 - Self-hosted authentication with Prisma adapter
- Email/Password authentication with session management

**Security & Performance:**
- @fastify/helmet - Security headers (XSS, clickjacking protection)
- @fastify/rate-limit - DOS attack prevention (100 req/min production)
- @fastify/cors - CORS with origin whitelist and preflight caching
- @fastify/compress - gzip/deflate compression (70% bandwidth reduction)
- Query depth limiting (max 12 levels) - Prevents expensive nested queries

**Testing:**
- Vitest 4.0 - Fast unit testing framework
- @vitest/ui - Interactive test UI

## Features

### API Endpoints
- `/graphql` - GraphQL API with 25+ queries (products, orders, customers, analytics, etc.)
- `/api/auth/*` - Better Auth endpoints (sign-in, sign-up, session management)
- `/health` - Health check endpoint for monitoring

### GraphQL Queries
- **Products**: Product catalog with metrics and parameters
- **Orders**: Order management with delivery tracking
- **Customers**: Customer database with purchase history
- **Analytics**: Revenue, performance, and market metrics
- **Homepage**: Aggregated dashboard data (best sellers, revenue charts, activities)
- **Notifications**: System notifications
- **Events**: Event tracking

### Security Measures
- ✅ Helmet security headers (XSS, MIME sniffing, clickjacking protection)
- ✅ Rate limiting (100 requests/minute in production)
- ✅ CORS whitelist with credentials support
- ✅ GraphQL query depth limiting
- ✅ Environment variable validation at startup
- ✅ Prisma ORM (SQL injection prevention)
- ✅ Session-based authentication (7-day expiry, 24h refresh)
- ✅ Graceful shutdown handlers

### Performance Optimizations
- ✅ Fastify framework (42k req/s vs Express 15k req/s)
- ✅ gzip/deflate compression (70% bandwidth reduction)
- ✅ CORS preflight caching (24 hours)
- ✅ Prisma connection pooling
- ✅ Pino structured logging (fastest Node.js logger)
- ✅ GraphQL schema caching
- ✅ ESM modules with top-level await

## Frontend

This backend fetches data from PostgreSQL database and sends it to associated NextJS frontend application

[https://github.com/matt765/spireflow](https://github.com/matt765/spireflow)

## Project Structure

```
├── prisma
│   ├── migrations         # Database migrations
│   ├── schema.prisma      # Database schema
│   └── seed.ts           # Database seeding script
├── src
│   ├── assets            # Static assets
│   ├── data              # Mock data for seeding
│   │   ├── analytics     # Analytics data
│   │   └── homepage      # Homepage data
│   ├── graphql
│   │   ├── schema.ts     # GraphQL schema & resolvers
│   │   └── types.ts      # GraphQL type definitions
│   ├── tests
│   │   ├── helper.ts     # Test utilities
│   │   ├── health.test.ts   # Health endpoint tests
│   │   ├── graphql.test.ts  # GraphQL API tests
│   │   └── auth.test.ts     # Authentication tests
│   ├── auth.ts           # Better Auth configuration
│   ├── config.ts         # Environment validation
│   ├── db.ts             # Prisma client (singleton)
│   └── server.ts         # Fastify server setup
└── package.json
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database (Required)
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Better Auth (Required)
BETTER_AUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32
BETTER_AUTH_URL=http://localhost:4000/api/auth

# Server Configuration (Optional)
NODE_ENV=development
PORT=4000
HOST=0.0.0.0

# CORS (Optional - for production)
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

## How to run

You can deploy this backend on services like Render, Railway, Heroku, or DigitalOcean. Alternatively, you can run it locally using commands below and access the data using GraphQL UI http://localhost:4000/graphql or Prisma Studio http://localhost:5555/

All commands are run from the root of the project, from a terminal.

### Development

| Command            | Action                                      |
| :----------------- | :------------------------------------------ |
| `npm install`      | Installs dependencies                       |
| `npm run build`    | Compiles TypeScript to JavaScript           |
| `npm run dev`      | Starts dev server with hot reload           |
| `npm start`        | Starts production server at `localhost:4000`|
| `npm test`         | Runs test suite                             |
| `npm run test:watch` | Runs tests in watch mode                  |

### Prisma

| Command                              | Action                                                 |
| :----------------------------------- | :----------------------------------------------------- |
| `npx prisma migrate dev --name init` | Creates and applies migrations based on schema changes |
| `npx prisma migrate deploy`          | Applies existing migrations (production)               |
| `npx prisma generate`                | Generates Prisma Client from schema                    |
| `npx prisma db seed`                 | Seeds database with mock data                          |
| `npx prisma studio`                  | Opens Prisma Studio at `localhost:5555`                |

## Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Set `ALLOWED_ORIGINS` to your frontend domain
3. Set `DATABASE_URL` to your PostgreSQL connection string
4. Generate `BETTER_AUTH_SECRET` using: `openssl rand -base64 32`
5. Set `BETTER_AUTH_URL` to your production auth endpoint

### Deployment Steps
1. Build: `npm run build`
2. Migrate database: `npx prisma migrate deploy`
3. Start server: `npm start`

### Platform-Specific Notes

**Render / Railway:**
- Set build command: `npm run build`
- Set start command: `npm start`
- Add PostgreSQL addon
- Configure environment variables

**Heroku:**
- Use Heroku Postgres addon
- Set buildpacks: `heroku/nodejs`
- Configure Config Vars in dashboard

**Vercel / Netlify:**
- Not recommended (designed for serverless)
- Use Render/Railway for persistent Node.js processes
| `npx prisma studio`                  | Opens Prisma Studio                                    |

## Docker support

You can run this application in a containerized environment using Docker, which ensures consistent deployment across different environments and simplifies the setup process by bundling all dependencies together.

| Command                                                      | Action                                      |
| :----------------------------------------------------------- | :------------------------------------------ |
| `docker build -t spireflow .`                                | Builds a Docker image from the Dockerfile   |
| `docker run -p 4000:4000 -e DATABASE_URL="DB_URL" spireflow` | Runs the container with database connection |
