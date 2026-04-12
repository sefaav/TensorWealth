# TensorWealth

TensorWealth is a data-driven wealth management platform built with Next.js, FastAPI, and PostgreSQL.

The project currently provides the first MVP building block: authentication. Users can register, log in, receive a JWT, and get redirected to a protected dashboard entry point.

## Current Features

- register and login flow
- JWT-based authentication
- PostgreSQL-backed user persistence
- protected `/dashboard` route
- root-level `npm run dev` launcher

## Stack

- Frontend: Next.js, React, TypeScript
- Backend: FastAPI, SQLAlchemy, Pydantic Settings
- Database: PostgreSQL

## Quick Start

### 1. Backend

Create `backend/.env` from `backend/.env.example`, then install dependencies:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Frontend

Create `frontend/.env.local` from `frontend/.env.local.example`, then install dependencies:

```powershell
cd frontend
npm install
```

### 3. Run the Project

From the repository root:

```powershell
npm run dev
```

If `backend/.env` points to `localhost:5432`, the launcher also starts PostgreSQL with Docker automatically.

Local URLs:

- Frontend: `http://localhost:3000`
- Backend: `http://127.0.0.1:8000`

## API

- `POST /api/auth/register`
- `POST /api/auth/login`

## App Routes

- `/` authentication page
- `/dashboard` protected dashboard placeholder

## Project Structure

```text
TensorWealth/
├── backend/
│   ├── app/
│   │   ├── core/        # Settings and security helpers
│   │   ├── db/          # SQLAlchemy base and session
│   │   ├── models/      # Database models
│   │   ├── routers/     # API routes
│   │   ├── schemas/     # Pydantic schemas
│   │   ├── services/    # Business logic
│   │   └── main.py      # FastAPI entry point
│   ├── .env.example
│   └── requirements.txt
├── frontend/
│   ├── app/
│   │   ├── dashboard/   # Protected dashboard page
│   │   ├── globals.css  # Global styling
│   │   ├── layout.tsx
│   │   └── page.tsx     # Login / register page
│   ├── lib/             # API and session helpers
│   ├── .env.local.example
│   └── package.json
├── docker-compose.yml   # Local PostgreSQL
├── dev.cmd              # Windows dev launcher
├── package.json         # Root launcher: npm run dev
└── README.md
```

## Notes

- the backend currently creates the `users` table on startup
- authentication state is stored in browser local storage
- the dashboard page is intentionally empty for now

## Future Implementation

Planned next steps for the project:

- Implement secure logout and session handling
- Expand the dashboard layout and navigation
- Connect external financial institutions
- Introduce migrations with Alembic
- Add net worth and portfolio entities
- Build allocation and performance views
- Add analytics and optimization tooling

## License

MIT. See [LICENSE](./LICENSE).
