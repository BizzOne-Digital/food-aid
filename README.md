# Foot Aid — Website + Admin

Next.js 16 (App Router, TypeScript, Tailwind v4) · MongoDB Atlas (Mongoose) · Serverless-safe image storage in MongoDB.

## 1. Setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | How to get it |
|---|---|
| `MONGODB_URI` | MongoDB Atlas > Connect > Drivers. In Atlas Network Access, allow `0.0.0.0/0` for Vercel. |
| `SESSION_SECRET` | `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `ADMIN_EMAIL` | The admin login email |
| `ADMIN_PASSWORD_HASH` | `npm run hash-password -- "YourStrongPassword"` (the script prints the value with each $ escaped for .env files) |
| `NEXT_PUBLIC_SITE_URL` | e.g. `https://www.myfootaid.com` (used for canonical URLs, sitemap and schema) |

```bash
npm run seed      # services, home/about content, settings, 3 testimonials (add -- --force to reset)
npm run dev       # http://localhost:3000
```

## 2. Admin

- Login: `/admin/login`. On first login, the env admin is copied into the `AdminUser` collection.
- Session: signed JWT in an HTTP-only, `sameSite=lax` cookie (secure in production), 8-hour expiry.
- `proxy.ts` blocks `/admin/*`, `/api/admin/*` and `/api/upload` without a session. Every handler also re-checks the session.

| Route | Purpose |
|---|---|
| `/admin` | Stats, recent bookings and messages, quick actions |
| `/admin/bookings` | Filter by status, view details, change status (New > Contacted > Confirmed > Completed / Cancelled) |
| `/admin/messages` | Read, mark unread, delete |
| `/admin/pages` | Home + About content and images |
| `/admin/services` | Add, edit, hide, reorder, delete |
| `/admin/testimonials` | Add, edit, publish/unpublish, delete |
| `/admin/media` | MongoDB image library (filter, copy URL, delete) |
| `/admin/settings` | Business info, logo/favicon, socials, offer, SEO |

## 3. Image storage (Vercel-safe)

- `POST /api/upload` (admin only): whitelisted folder, JPEG/PNG/WEBP/GIF only, 8MB max, crypto-random filename. Saves the binary to `StoredUpload`.
- `GET /api/uploads/[folder]/[filename]`: validated and served from MongoDB with `Cache-Control: immutable`.
- Content documents store only the URL string.
- On save, any upload no longer referenced is deleted (`cleanupReplacedImages`). This only happens after the content update succeeds.
- `resolveImageUrl()` maps legacy `/uploads/...` paths and empty values to `/images/placeholder.webp`.

## 4. Deploy (Vercel)

1. Push to GitHub and import in Vercel.
2. Add the five environment variables.
3. Deploy, then run `npm run seed` locally against the production `MONGODB_URI` once.
4. Add the purchased domain in Vercel > Domains and update `NEXT_PUBLIC_SITE_URL`.
