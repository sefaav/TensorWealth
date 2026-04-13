# TensorWealth

TensorWealth is a data-driven wealth management platform built with Next.js, FastAPI, and PostgreSQL.

The project currently provides the first MVP building block: authentication. Users can register, log in, receive a JWT, and access protected app pages through a responsive sidebar shell.

## Current Features

- register and login flow
- JWT-based authentication
- PostgreSQL-backed user persistence
- protected app routes with responsive sidebar navigation
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
- `/portfolio` protected placeholder page
- `/budget` protected placeholder page
- `/analysis` protected placeholder page
- `/add-assets` protected placeholder page

## Project Structure

```text
TensorWealth/
|-- backend/
|   |-- app/
|   |   |-- core/            # Settings and security helpers
|   |   |-- db/              # SQLAlchemy base and session
|   |   |-- models/          # Database models
|   |   |-- routers/         # API routes
|   |   |-- schemas/         # Pydantic schemas
|   |   |-- services/        # Business logic
|   |   `-- main.py          # FastAPI entry point
|   |-- .env.example
|   `-- requirements.txt
|-- frontend/
|   |-- app/
|   |   |-- add-assets/      # Protected placeholder page
|   |   |-- analysis/        # Protected placeholder page
|   |   |-- budget/          # Protected placeholder page
|   |   |-- dashboard/       # Protected dashboard page
|   |   |-- portfolio/       # Protected placeholder page
|   |   |-- globals.css      # Global styling
|   |   |-- icon.png         # App favicon
|   |   |-- layout.tsx
|   |   `-- page.tsx         # Login / register page
|   |-- components/          # Shared app shell and sidebar
|   |-- lib/                 # API and session helpers
|   |-- .env.local.example
|   `-- package.json
|-- docker-compose.yml       # Local PostgreSQL
|-- dev.cmd                  # Windows dev launcher
|-- package.json             # Root launcher: npm run dev
`-- README.md
```

## Notes

- the backend currently creates the `users` table on startup
- authentication state is stored in browser local storage
- protected app pages are intentionally placeholders for now

## Future Implementation

Planned next steps for the project:

- Connect external financial institutions
- Add net worth and portfolio entities
- Expand the dashboard layout
- Build allocation and performance views
- Introduce migrations with Alembic
- Implement secure logout and session handling
- Add analytics and optimization tooling

## License

MIT. See [LICENSE](./LICENSE).
