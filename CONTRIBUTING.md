# Contributing guide

Hi there! 👋 Thanks for checking out the Nellavio backend.
Every form of contribution is valuable. Below are the main ways to get involved:

> For frontend-related contributions (UI, components, charts), please see the [main repository](https://github.com/nellavio/nellavio).

## 1. Share Feedback and Ideas 💡

- Use the **[Discussions](https://github.com/nellavio/nellavio/discussions/1)** on GitHub to share feedback, suggestions, or ideas for improvement.
- Open an **[Issue](https://github.com/nellavio/nellavio-backend/issues)** if you've found a bug or something doesn't work as expected.

## 2. Support Development 🔥

If you'd like to support continued work on the project, you can do so through [**GitHub Sponsors**](https://github.com/sponsors/matt765).

## 3. Contribute code

Feel free to fork the repository and submit a merge requests. If you've spotted something that can be improved or fixed, your input is more than welcome.

### Development setup

```bash
git clone https://github.com/nellavio/nellavio-backend.git
cd nellavio-backend
npm install
```

Create a `.env` file:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:4000/api/auth
```

Set up the database and start the server:

```bash
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Server runs at `http://localhost:4000`.

### Submitting a pull request

1. Fork the repository
2. Create a branch from `main` (`git checkout -b my-fix`)
3. Make your changes
4. Run checks before pushing:
   ```bash
   npm run lint
   npm run type-check
   npm test
   ```
5. Push and open a pull request against `main`

Husky pre-commit hooks will automatically run ESLint and Prettier on staged files.

### What makes a good PR

- Focused - one concern per PR
- Passes all CI checks (lint, type-check, tests, build)
- No breaking changes to the GraphQL schema without discussion
- New environment variables documented in the PR description
- Does not introduce console errors or warnings

## License Information for Contributors

By submitting a contribution to this project, you agree that your contributions are licensed under the MIT License.
