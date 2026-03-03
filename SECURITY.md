# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x     | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues, discussions, or pull requests.**

Instead, please use one of the following channels:

- **GitHub Private Vulnerability Reporting**: [Report a vulnerability](https://github.com/matt765/spireflow-backend/security/advisories/new)
- **Email**: mateusz.wyrebek@gmail.com

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Affected components or files (if known)
- Potential impact

### What to Expect

- **Acknowledgment** within 72 hours
- **Assessment and fix** timeline communicated after initial review
- **Credit** in the release notes (with your consent) once the fix is published

## Scope

### In Scope

- SQL injection or query manipulation vulnerabilities
- Authentication or session management flaws
- Insecure default configurations
- Vulnerable dependencies (npm packages)
- Information disclosure through API responses

### Out of Scope

- Vulnerabilities in user-modified code or custom deployments
- Security of user's database or hosting infrastructure
- The frontend application (reported separately at [spireflow](https://github.com/matt765/spireflow))
- Missing features that are not part of the project's scope
