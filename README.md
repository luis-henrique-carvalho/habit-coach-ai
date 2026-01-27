This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- (Optional) Google and GitHub OAuth credentials

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. Set up the database:
   ```bash
   pnpm db:push
   ```

5. Run the development server:
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication

This project uses [Better Auth](https://betterauth.dev/) for authentication with:
- Email + Password sign-up and login
- OAuth integration (Google & GitHub)
- Email verification
- Protected routes with middleware
- Session management

### Setting Up Authentication

1. **Configure OAuth Providers** (optional but recommended):
   - See [OAUTH-SETUP.md](docs/OAUTH-SETUP.md) for detailed instructions

2. **Set Required Environment Variables**:
   ```bash
   BETTER_AUTH_SECRET=your_secret_key
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

3. **Access Authentication Pages**:
   - Sign up: http://localhost:3000/register
   - Sign in: http://localhost:3000/login
   - Protected dashboard: http://localhost:3000/dashboard

### Authentication Documentation

- [ENVIRONMENT-VARIABLES.md](docs/ENVIRONMENT-VARIABLES.md) - Complete environment variable guide
- [AUTH-API.md](docs/AUTH-API.md) - API methods and usage examples
- [OAUTH-SETUP.md](docs/OAUTH-SETUP.md) - OAuth provider setup

## Project Structure

```
src/
├── app/
│   ├── (public)/(auth)/       # Auth pages (login, register)
│   ├── (private)/              # Protected routes (dashboard)
│   └── api/auth/               # Auth API endpoints
├── lib/
│   ├── auth.ts                 # Better Auth configuration
│   ├── auth-client.ts          # Better Auth client setup
│   └── utils.ts                # Utility functions
├── components/
│   ├── ui/                     # shadcn/ui components
│   └── sign-out-button.tsx     # Auth-related components
└── middleware.ts               # Route protection middleware
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Better Auth Documentation](https://betterauth.dev/) - authentication framework

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
