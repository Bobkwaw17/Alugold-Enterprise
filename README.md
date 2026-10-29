# ALUGOLD ENTERPRISE

## Setup

```bash
# backend (Express + TypeScript + MongoDB)
cd backend && cp .env.example .env     # fill MONGODB_URL, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run seed      # creates the admin user + services
npm run dev       # http://localhost:4000
npm test          # smoke tests (full flow runs when MONGODB_URL is set)

# frontend (React + Vite + Tailwind v4)
cd frontend && npm install && npm run dev   # http://localhost:5173, /api is proxied to :4000
```

Auth is a Bearer JWT (`Authorization: Bearer <token>`), 7-day expiry. Logout is client-side (token discarded).
Admin-only: all `/api/projects`, and `GET/PATCH/DELETE /api/bookings`. Preferences: the user themself or an admin.
Responses are `{ status: "success", data }` or `{ status: "error", data: { message } }`.
A booked slot returns `409`; `GET /api/bookings/slots?date=` lists availability.

## Deploying the frontend (Vercel)

`frontend/vercel.json` rewrites every path to `index.html` so deep links like `/about` and `/admin/quotes` work on refresh.
Set the project root to `frontend` and add the env var `VITE_API_URL` (e.g. `https://your-api.example.com/api`);
on the backend set `CLIENT_ORIGIN` to the Vercel URL so CORS allows it.

## Admin panel

Open `/admin` and sign in with the seeded admin (`ADMIN_EMAIL` / `ADMIN_PASSWORD`). Sections:
Overview (counts + upcoming bookings), Bookings, Quote Requests, Messages, Subscribers, Projects, Services (create/edit/delete),
and **Page Content** (edit Home / About / Services page text, hotline, email and footer tagline; empty = default).

Editable texts live in `frontend/src/lib/contentDefaults.js` (defaults + admin form) and the whitelist in
`backend/Utils/contentKeys.ts` — to make new text editable, add the key to both and read it with `useText()`.

## API Endpoints

## Services
| Method | Endpoint |
|--------|----------|
| `GET` | `/api/services` (sorted by `order`) |
| `GET` | `/api/services/:id` (Mongo id or slug) |
| `POST` | `/api/services` (admin) |
| `PATCH` | `/api/services/:id` (admin) |
| `DELETE` | `/api/services/:id` (admin) |

**POST body:** `{ name, description, category?, slug?, imageUrl?, imageAlt?, featured?, order? }` — slug defaults to the slugified name. `order` sets card position on the Service page (first card renders large).

## Bookings
| Method | Endpoint |
|--------|----------|
| `POST` | `/api/bookings` |
| `GET` | `/api/bookings` |
| `GET` | `/api/bookings/:id` |
| `GET` | `/api/bookings/slots?date=YYYY-MM-DD` |
| `PATCH` | `/api/bookings/:id` |
| `DELETE` | `/api/bookings/:id` |

**POST body:** `{ service, date, timeSlot, fullName, email, projectDescription }`

## Quotes
| Method | Endpoint |
|--------|----------|
| `POST` | `/api/quotes` |

**POST body:** `{ fullName, email, phone, serviceType, projectDescription }`

## Newsletter
| Method | Endpoint |
|--------|----------|
| `POST` | `/api/newsletter/subscribe` |
| `DELETE` | `/api/newsletter/unsubscribe` |

**body:** `{ email }`

## Auth (Admin only)
| Method | Endpoint |
|--------|----------|
| `POST` | `/api/auth/login` |
| `POST` | `/api/auth/logout` |
| `GET` | `/api/auth/me` |

**POST /login body:** `{ email, password }`

## Projects (Admin)
| Method | Endpoint |
|--------|----------|
| `GET` | `/api/projects` |
| `GET` | `/api/projects/:id` |
| `POST` | `/api/projects` |
| `PATCH` | `/api/projects/:id` |

**POST body:** `{ name, serviceType, description, status?, progress?, phase?, nextMilestone? }`

## User Preferences
| Method | Endpoint |
|--------|----------|
| `GET` | `/api/users/:id/preferences` |
| `PUT` | `/api/users/:id/preferences` |

**PUT body:** `{ materials?: string[], finishes?: string[], notifications?: { milestones?, email? } }`

## Contact
| Method | Endpoint |
|--------|----------|
| `POST` | `/api/contact` |

**POST body:** `{ fullName, email, message }`

## Admin & content (admin-only unless noted)
| Method | Endpoint |
|--------|----------|
| `GET` | `/api/admin/stats` |
| `GET` | `/api/content` (public) |
| `PUT` | `/api/content` — body `{ key: "text" }`, empty string reverts to default |
| `GET/PATCH/DELETE` | `/api/quotes[/:id]` — PATCH `{ status: new\|contacted\|closed }` |
| `GET/PATCH/DELETE` | `/api/contact[/:id]` — PATCH `{ status: unread\|read\|archived }` |
| `GET/DELETE` | `/api/newsletter[/:id]` |
| `DELETE` | `/api/projects/:id` |
