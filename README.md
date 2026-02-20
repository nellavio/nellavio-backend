# Spireflow backend

Open source backend for Spireflow dashboard

## Tech stack

NodeJS, Fastify, PostgreSQL, Prisma, GraphQL, Docker, Better Auth

## Endpoints

- `/graphql` - GraphQL API with 25+ queries (products, orders, customers, analytics, etc.)
- `/api/auth/*` - Better Auth endpoints (sign-in, sign-up, session management)
- `/health` - Health check endpoint for monitoring

## Data flow

```mermaid
graph LR
    A[Frontend] -->|GraphQL| B[Fastify Server]
    A -->|Auth API| B
    B -->|Mercurius| C[GraphQL Schema]
    B -->|Better Auth| D[Auth Logic]
    C -->|Prisma Client| E[PostgreSQL]
    D -->|Prisma Adapter| E
```

## Frontend

This backend serves data to Spireflow dashboard via GraphQL API and handles authentication through Better Auth.

**Important:** The frontend works independently without backend by default. It will automatically use mock data from `backendBackup.json` and keep routes protection disabled if backend is not configured. You can connect this backend if you want real database functionality and authentication.

Frontend repository: [https://github.com/matt765/spireflow](https://github.com/matt765/spireflow)

## Project Structure

```
├── prisma
│   ├── migrations           # Database migrations
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Database seeding script
├── src
│   ├── assets               # Static assets
│   ├── data                 # Mock data for seeding
│   │   ├── analytics        # Analytics data
│   │   └── homepage         # Homepage data
│   ├── graphql
│   │   ├── schema.ts        # GraphQL schema & resolvers
│   │   └── types.ts         # GraphQL type definitions
│   ├── tests
│   │   ├── helper.ts        # Test utilities
│   │   ├── health.test.ts   # Health endpoint tests
│   │   ├── graphql.test.ts  # GraphQL API tests
│   │   └── auth.test.ts     # Authentication tests
│   ├── auth.ts              # Better Auth configuration
│   ├── config.ts            # Environment validation
│   ├── db.ts                # Prisma client
│   └── server.ts            # Fastify server setup
└── package.json
```

## How to run

You can deploy this backend on services like AWS, Back4App, Render or Heroku. Alternatively, you can run it locally using commands below and access the data in GraphQL UI http://localhost:4000/graphql or Prisma Studio http://localhost:5555/

### Localhost

1. Clone the repository:

```bash
git clone https://github.com/matt765/spireflow-backend.git
cd spireflow-backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory with the following variables:

```bash
# Database (Required)
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Better Auth (Required)
BETTER_AUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32
BETTER_AUTH_URL=http://localhost:4000/api/auth
```

Generate secret key: `openssl rand -base64 32`

4. Set up database:

Ensure you have a PostgreSQL database running.

```bash
npx prisma migrate deploy
npx prisma db seed
```

5. Build and start:

```bash
npm run build
npm run dev
```

Server will be available at:

- GraphQL API: `http://localhost:4000/graphql`
- Better Auth: `http://localhost:4000/api/auth`
- Health check: `http://localhost:4000/health`

### Remote Deployment

**Configuration:**

Set up environment variables

1. Generate and set `BETTER_AUTH_SECRET`: `openssl rand -base64 32`
2. Set `DATABASE_URL` to your PostgreSQL connection string
3. Set `BETTER_AUTH_URL` to your production URL (e.g., `https://your-api.app/api/auth`)
4. Set `ALLOWED_ORIGINS` to your frontend domain (e.g., `https://your-app.vercel.app`)
5. (Optionally) Set `NODE_ENV=production`

**Build & Start Commands:**

Most platforms will ask for build and start commands. Use the following:

- **Build Command:** `npm install && npx prisma generate && npm run build`
- **Start Command:** `npx prisma migrate deploy && npm start`

> Note: We include `prisma migrate deploy` in the start command to ensure database migrations are applied automatically during deployment.

**Tip:** You can also run migrations and seed the remote database from your local machine. Simply set the `DATABASE_URL` in your local `.env` file to your remote database connection string and run `npx prisma migrate deploy` and `npx prisma db seed`.

> Note that commands like `prisma migrate dev` or `prisma db push --force-reset` can reset your database. You can use `prisma migrate deploy` which only applies pending migrations without touching existing data.

### Available Commands

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
| `npx prisma studio`                  | Opens Prisma Studio at `localhost:5555`                |

### Connecting Frontend

After deploying backend, you can update your front-end `.env` file. Follow front-end README.md for specific instructions.

## Docker support

You can run this application in a containerized environment using Docker, which ensures consistent deployment across different environments and simplifies the setup process by bundling all dependencies together.

| Command                                                      | Action                                      |
| :----------------------------------------------------------- | :------------------------------------------ |
| `docker build -t spireflow .`                                | Builds a Docker image from the Dockerfile   |
| `docker run -p 4000:4000 -e DATABASE_URL="DB_URL" spireflow` | Runs the container with database connection |

## Data viewer

There is a simple data viewer available if you want to take a look at the data in table form. Please note that this backend repository serves as an optional addition to an open-source project focused primarily on the front-end, which is designed to allow you to easily plug in your own backend. As a result, the tables are intentionally simplified and are not meant to represent real-world production database structures.

https://data-viewer.spireflow.app/
