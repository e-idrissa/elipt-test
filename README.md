# Soko

Soko is a Next.js e-commerce dashboard for creating and managing products.
It includes account registration and sign-in, email OTP verification, account
and avatar management, product creation and cover uploads, and separate views
for a user's products and products owned by other users.

## Features

- Sign up, sign in, sign out, and OTP verification
- Account configuration, profile deletion, and avatar uploads
- Create, view, and delete products
- Upload product covers
- Protected dashboard and product pages
- Separate **Your Products** and **Other People's Products** views

## Tech stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- React Hook Form and Zod
- Axios
- Shadcn-style UI components
- Sonner notifications

## Getting started

### Prerequisites

- Node.js 20 or later
- npm
- Access to the Soko API

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app redirects the root route to `/dashboard`. Protected routes require an
`auth_token` cookie created by the sign-in flow.

## API configuration

The server-side API routes proxy requests to:

```text
https://elipt.elieruvinga.online
```

The current route handlers contain this API base URL directly. The
`BASE_URL=your-base-url` entry in `.env.example` is not currently read by the
application.

## Available scripts

```bash
npm run dev    # Start the development server
npm run build  # Create a production build
npm run start  # Start the production server
npm run lint   # Run ESLint
```

## Routes

Public routes:

- `/signin`
- `/signup`
- `/verify-otp`
- `/config-account`

Protected routes:

- `/dashboard`
- `/products/yours`
- `/products/others`
