<div id="user-content-toc" align="center">
  <ul align="center" style="list-style: none;">
    <summary>
      <h1>Nellavio Backend</h1>
    </summary>
  </ul>
</div>

<div align="center">
  <a href="https://github.com/nellavio/nellavio-backend/blob/master/CHANGELOG.md" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/%20-changelog-blue?logo=readme&logoColor=white&labelColor=grey" alt="Changelog" />
  </a>
  <a href="https://github.com/nellavio/nellavio-backend/blob/master/license" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
  </a>
  <a href="https://github.com/nellavio/nellavio-backend/releases" style="text-decoration: none;">
    <img src="https://img.shields.io/github/package-json/v/nellavio/nellavio-backend?color=green" alt="Version" />
  </a>
</div>

<h4 align="center">Open source Node.js backend for Nellavio dashboard</h4>
<br />

## Overview

It provides data for [Nellavio](https://github.com/nellavio/nellavio) - an open source dashboard starter built with Next.js & TypeScript. The GraphQL API serves 20+ queries covering homepage metrics, orders, customers, products, analytics and more, while the Better Auth enables production-ready authentication flow, handling session management and user credentials.

The frontend works independently by default - it loads mock data from `backendBackup.json` and keeps route protection disabled. Connecting this backend enables real database functionality, live data fetching on each request and a complete authentication system.

## Tech stack

Node.js, Fastify, PostgreSQL, Prisma, GraphQL, Docker, Better Auth

## Endpoints

- `/graphql` - GraphQL API with 20+ queries (products, orders, customers, analytics, etc.)
- `/api/auth/*` - Better Auth endpoints (sign-in, sign-up, session management)
- `/health` - Health check endpoint for monitoring

## Project Structure

```
├── prisma
│   ├── migrations           # Database migrations
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Database seeding script
├── src
│   ├── assets               # Static assets
│   ├── data                 # Mock data for seeding
│   ├── graphql              # GraphQL API layer
│   │   ├── schema.ts        # GraphQL schema & resolvers
│   │   └── types.ts         # GraphQL type definitions
│   ├── tests                # Test files
│   │   └── helpers          # Test utilities
│   ├── auth.ts              # Better Auth configuration
│   ├── config.ts            # Environment validation
│   ├── db.ts                # Prisma client
│   └── server.ts            # Fastify server setup
└── package.json
```

## How to run

You can run this backend locally using commands below and access the data in GraphQL UI http://localhost:4000/graphql or Prisma Studio http://localhost:5555/. Alternatively, you can deploy it on services like AWS, Back4App, Render or Heroku.

### Localhost

1. Clone the repository:

```bash
git clone https://github.com/nellavio/nellavio-backend.git
cd nellavio-backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up database:

You need a PostgreSQL database running. You can use an existing local installation, spin one up with Docker, or use a free cloud provider of your choice.

4. Set up environment variables:

Create a `.env` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32
BETTER_AUTH_URL=http://localhost:4000/api/auth
```

5. Apply migrations and seed the database:

```bash
npx prisma migrate deploy
npx prisma db seed
```

6. Run the server:

```bash
npm run dev
```

Server will be available at:

- GraphQL API: `http://localhost:4000/graphql`
- Better Auth: `http://localhost:4000/api/auth`
- Health check: `http://localhost:4000/health`

### Remote Deployment

Set up a PostgreSQL database on your hosting platform, then configure environment variables

1. Generate and set `BETTER_AUTH_SECRET`: `openssl rand -base64 32`
2. Set `DATABASE_URL` to your PostgreSQL connection string
3. Set `BETTER_AUTH_URL` to your production URL (e.g., `https://your-api.app/api/auth`)
4. Set `ALLOWED_ORIGINS` to your frontend domain (e.g., `https://your-app.vercel.app`)
5. (Optionally) Set `NODE_ENV=production`

**Build & Start Commands:**

Most platforms will ask for build and start commands. Use the following:

- **Build Command:** `npm install && npx prisma generate && npm run build`
- **Start Command:** `npx prisma migrate deploy && npm start`

After the first deployment, you need to seed the database with initial data. Set the `DATABASE_URL` in your local `.env` file to the remote database connection string and run `npx prisma migrate deploy` and `npx prisma db seed`.

### Connecting Frontend

After deploying backend, you can update your front-end `.env` file. Follow front-end README.md for specific instructions.

## Available Commands

| Command                | Action                                       |
| :--------------------- | :------------------------------------------- |
| `npm install`          | Installs dependencies                        |
| `npm run build`        | Compiles TypeScript to JavaScript            |
| `npm run dev`          | Starts dev server with hot reload            |
| `npm start`            | Starts production server at `localhost:4000` |
| `npm test`             | Runs test suite                              |
| `npm run test:watch`   | Runs tests in watch mode                     |
| `npm run lint`         | Runs ESLint to check code quality            |
| `npm run lint:fix`     | Runs ESLint and auto-fixes issues            |
| `npm run type-check`   | Runs TypeScript type checking                |
| `npm run format`       | Formats code with Prettier                   |
| `npm run format:check` | Checks if code is properly formatted         |

### Prisma

| Command                              | Action                                                 |
| :----------------------------------- | :----------------------------------------------------- |
| `npx prisma migrate dev --name init` | Creates and applies migrations based on schema changes |
| `npx prisma migrate deploy`          | Applies existing migrations                            |
| `npx prisma generate`                | Generates Prisma Client from schema                    |
| `npx prisma db seed`                 | Seeds database with mock data                          |
| `npx prisma migrate reset`           | Drops database, re-applies all migrations and seeds    |
| `npx prisma studio`                  | Opens Prisma Studio at `localhost:5555`                |

## Docker support

You can run this application in a containerized environment using these Docker commands

| Command                                                     | Action                                      |
| :---------------------------------------------------------- | :------------------------------------------ |
| `docker build -t nellavio .`                                | Builds a Docker image from the Dockerfile   |
| `docker run -p 4000:4000 -e DATABASE_URL="DB_URL" nellavio` | Runs the container with database connection |

## Data viewer

There is a simple data viewer available if you want to take a look at the data in a table form. Please note that although the authentication flow is designed to be production-ready, the rest of this backend serves as an optional data source that delivers sample data for dashboard views. As a result, there is no real business logic for the data layer, and most of the database schema is intentionally simplified.

https://data-viewer.nellavio.com/
