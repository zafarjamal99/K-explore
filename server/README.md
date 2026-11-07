# K Explore Artist & Tour Platform — Backend API

Production-ready Node.js & Express REST API powered by TypeScript, Prisma ORM, and PostgreSQL.

## Architecture & Technology Stack

- **Runtime**: Node.js v18+ / v20+
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Security**: Helmet HTTP headers, CORS origin whitelist, Express Rate Limiting
- **Validation**: Zod runtime schema validation
- **Hosting Targets**: Render, Railway, AWS ECS / Lambda, or Fly.io

---

## Getting Started

### 1. Installation

```bash
cd server
npm install
```

### 2. Environment Configuration

Create a `.env` file in `server/` (this file is excluded from Git tracking via `.gitignore`):

```env
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
DATABASE_URL="postgresql://user:password@localhost:5432/kexplore_db?schema=public"
JWT_SECRET="your-super-secret-production-jwt-key"
```

### 3. Prisma Database Setup

Generate the Prisma client and run migrations:

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4. Run Development Server

```bash
npm run dev
```

API will be live at `http://localhost:5000/api`.

---

## API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/health` | Server health check | No |
| `GET` | `/api/artists/:slug` | Retrieve artist profile & discography | No |
| `GET` | `/api/tours` | List world tour dates (optional `?region=Europe`) | No |
| `POST` | `/api/tours` | Add a new tour date to the schedule | Yes (Admin) |
| `GET` | `/api/media` | Retrieve photo and video gallery items | No |
| `GET` | `/api/live` | Stream status, broadcast URL, viewer count | No |
| `POST` | `/api/forms/booking` | Submit promoter tour booking inquiry | No (Rate-limited) |
| `POST` | `/api/forms/contact` | Submit general/press/licensing message | No (Rate-limited) |
| `GET` | `/api/admin/inquiries` | List all submitted promoter inquiries | Yes (Admin) |
| `PATCH` | `/api/admin/inquiries/:id` | Update inquiry status (`PENDING`, `ACCEPTED`, etc.) | Yes (Admin) |

---

## Deployment to Render / Railway

1. **Database**: Spin up a managed PostgreSQL instance on Render, Neon, Supabase, or Railway.
2. **Environment**: Supply `DATABASE_URL`, `NODE_ENV=production`, and `CLIENT_ORIGIN` (your Vercel app URL).
3. **Build Command**: `npm install && npx prisma generate && npm run build`
4. **Start Command**: `npm start`
