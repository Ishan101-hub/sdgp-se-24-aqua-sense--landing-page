# AquaSense — Smart Water Monitoring & Leak Control

The official **landing page** for AquaSense — an IoT-powered smart water monitoring system that provides real-time usage tracking, intelligent leak detection, and automatic pipeline isolation for homes and buildings. Built as a group project at the Informatics Institute of Technology (IIT), Colombo.

> *"Smart Control, Zero Leaks, More Savings."*

🌐 **Live Site:** [aquasense-landing-page.onrender.com](https://aquasense-landing-page.onrender.com)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Sections Breakdown](#sections-breakdown)
- [Backend — Feedback Mailer](#backend--feedback-mailer)
- [How to Run Locally](#how-to-run-locally)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Team](#team)
- [SDG Alignment](#sdg-alignment)

---

## Overview

A single-page marketing and showcase website for the AquaSense IoT product. The frontend is a fully responsive single HTML page with smooth-scroll navigation, CSS animations, and JavaScript interactivity. The backend is a lightweight Express.js server that powers the feedback form — collecting name, email, message, and star rating, then delivering a formatted HTML email via the **Resend** API.

---

## Features

- **Animated hero section** — CSS water drop animation with falling drops, splash rings, and ripple puddle effects
- **Sticky navbar with scroll effect** — background becomes opaque on scroll; active link highlights as sections enter view
- **Hamburger mobile menu** — slides down on toggle, auto-closes on scroll or link click
- **Dashboard image gallery** — screenshots of Login, Dashboard, Leakage Monitor, and Reports pages
- **Services list** — numbered feature list with custom styling
- **Functionality / How It Works** — device grid showing Water Flow Sensor, Solenoid Valve, ESP32 Microcontroller, HiveMQ MQTT Broker, and Mobile App
- **SDG Impact cards** — four SDG contribution cards (SDG 6, 9, 11, 12)
- **Team section** — six team member cards with GitHub profile links
- **Feedback form with live backend** — star rating (1–5), name, email, message; validated client-side and server-side; sends a branded HTML email via Resend API
- **Social footer** — contact details, quick links, Facebook, Instagram, WhatsApp, X (Twitter) icons
- **Fully responsive** — Bootstrap 4 grid for layout, custom media queries for fine-tuning

---

## Tech Stack

### Frontend

| Layer | Technology |
|-------|-----------|
| **Markup** | HTML5 |
| **Styling** | CSS3 (custom animations, Flexbox, Grid) + Bootstrap 4.6 |
| **Scripting** | Vanilla JavaScript (ES6+) |
| **Icons** | Font Awesome 6.5.1 |
| **Smooth scroll** | Native `scrollIntoView` |
| **Active nav** | Intersection-based scroll detection |

### Backend

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Email API** | Resend (`fetch` to `api.resend.com/emails`) |
| **CORS** | `cors` npm package |
| **Config** | `dotenv` |
| **Dev server** | `nodemon` |
| **Deployment** | Render.com |

---

## Project Structure

```
aquasense-landing-page/
│
├── index.html          # Single-page frontend — all sections
├── styles.css          # All custom CSS — animations, layout, components
├── script.js           # All frontend JS — nav, scroll, form handler
│
├── server.js           # Express backend — POST /api/feedback → Resend email
├── package.json        # npm metadata and dependencies
├── package-lock.json   # Locked dependency tree
│
├── .env                # ⚠ Real credentials — excluded from version control
├── .env.sample         # ✅ Credentials template — copy this to .env
│
├── images/             # All images — team photos, dashboard screenshots, icons, logos
│   ├── white.png               # Nav logo (white version)
│   ├── final logo 1.png        # Footer logo
│   ├── colored logo.png        # App icon
│   ├── icon 1.png              # Browser tab favicon
│   ├── Login page.png          # Dashboard screenshot
│   ├── Dashboard.png           # Dashboard screenshot
│   ├── Leakage.png             # Dashboard screenshot
│   ├── Report.png              # Dashboard screenshot
│   ├── sensor.png              # Water flow sensor image
│   ├── valve.png               # Solenoid valve image
│   ├── ESP32.png               # ESP32 microcontroller image
│   ├── t-removebg-preview.png  # HiveMQ logo
│   ├── Sustainable_Development_Goal_6.png
│   ├── Sustainable_Development_Goal_9.png
│   ├── Sustainable_Development_Goal_11.png
│   ├── Sustainable_Development_Goal_12.png
│   └── (team member photos)
│
├── .gitignore
└── README.md
```

---

## Sections Breakdown

### Hero (`#home`)
Fullscreen dark-themed section with headline *"Smart Control, Zero Leaks, More Savings."* and a CSS-only water animation on the right — seven animated water drops falling, three splash rings on impact, and a puddle with expanding ripple rings. All motion is CSS `@keyframes`.

### Dashboard (`#dashboard`)
Four image cards in a responsive grid showing the actual AquaSense application screens: Login, Main Dashboard, Leakage Monitor, and Report Generator.

### Services (`#services`)
Numbered ordered list of six core product features with custom `counter()` CSS numbering and styled list items.

### Functionality / How It Works (`#functionality`)
Device grid with five items showing the IoT hardware/software stack: Water Flow Sensor → Solenoid Valve → ESP32 Microcontroller → HiveMQ MQTT Broker → Mobile Application. Each item has an image, name, and description.

### SDG Impact (`#impact`)
Four SDG contribution cards:
- **SDG 6** — Clean Water and Sanitation
- **SDG 9** — Industry, Innovation and Infrastructure
- **SDG 11** — Sustainable Cities and Communities
- **SDG 12** — Responsible Consumption and Production

### Team (`#team`)
Six team member cards with profile photos (each linking to the member's GitHub profile), name, and role.

### Feedback (`#feedback`)
Bootstrap 4 grid form with:
- Name (text input)
- Email (text input, validated with regex)
- Message (textarea)
- Star rating (radio inputs styled as ★ symbols, reverse-order CSS trick for hover fill)
- Submit button — async POST to `/api/feedback`, loading state, success/error message display

### Footer
Four-column footer with logo, contact details (address, phone, email), quick navigation links, and social media icons (Facebook, Instagram, WhatsApp, X/Twitter).

---

## Backend — Feedback Mailer

`server.js` exposes one endpoint:

### `POST /api/feedback`

**Request body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great product!",
  "rating": "5"
}
```

**Validation:**
- `name`, `email`, `message` — all required; returns `400` if missing
- `email` — validated against `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`; returns `400` if invalid

**On success:**
- Calls `https://api.resend.com/emails` with a branded dark-themed HTML email
- Subject: `New Feedback from {name} — AquaSense`
- `reply_to` set to the sender's email for easy replies
- Returns `200 { success: true }`

**On failure:**
- Resend API error → `500 { success: false, error: "Failed to send email." }`
- Server error → `500 { success: false, error: "Server error. Please try again." }`

### `GET /`
Health check — returns `"AquaSense backend is running ✅"`

---

## How to Run Locally

**Requirements:** Node.js 18+

```bash
# 1. Clone the repository
git clone https://github.com/Ishan101-hub/aquasense-landing-page.git
cd aquasense-landing-page

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.sample .env
# Open .env and fill in your RESEND_API_KEY and EMAIL_TO

# 4. Start the backend server
npm run dev           # with nodemon (auto-restart on changes)
# or
npm start             # plain node

# 5. Open the frontend
# Open index.html directly in your browser, or serve it:
npx serve .
# Then visit http://localhost:3000 (or the port shown)
```

The feedback form in `script.js` points to:
```js
const BACKEND_URL = "https://aquasense-landing-page.onrender.com/api/feedback";
```
Change this to `http://localhost:3000/api/feedback` for local testing.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | ✅ | API key from [resend.com](https://resend.com) |
| `EMAIL_TO` | ✅ | Email address to receive feedback submissions |
| `ALLOWED_ORIGIN` | ⬜ | CORS allowed origin (default: `*`) |
| `PORT` | ⬜ | Server port (default: `3000`) |

Get your free Resend API key at [resend.com/api-keys](https://resend.com/api-keys).

---

## Deployment

The backend is deployed on **Render.com** (free tier):

- **Service type:** Web Service
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Environment variables:** Set `RESEND_API_KEY`, `EMAIL_TO`, `ALLOWED_ORIGIN` in Render dashboard

The frontend (`index.html`, `styles.css`, `script.js`, `images/`) is served as static files and can be deployed separately on **GitHub Pages**, **Netlify**, or **Vercel**.

---

## Team

| Name | Role | GitHub |
|------|------|--------|
| Ishan Udawatte | Project Manager / Back-end Developer | [@Ishan101-hub](https://github.com/Ishan101-hub) |
| Lathmi Wanigasekara | DBA / Back-end Developer | [@lathmi](https://github.com/lathmi) |
| Ewmini Perera | Front-end Developer | [@yeeb-wq](https://github.com/yeeb-wq) |
| Kulith Kusalwin | Back-end Developer | [@Kulith-20232529](https://github.com/Kulith-20232529) |
| Sahan Rasanga | UX/UI Designer / Back-end Developer | [@sahanrasanga23](https://github.com/sahanrasanga23) |
| Rashan Kathurusinghe | Front-end Developer | [@Rashan2k6](https://github.com/Rashan2k6) |

---

## SDG Alignment

AquaSense directly contributes to four United Nations Sustainable Development Goals:

| SDG | Goal | How AquaSense Contributes |
|-----|------|--------------------------|
| **SDG 6** | Clean Water and Sanitation | Reduces water wastage via real-time monitoring and smart leak isolation |
| **SDG 9** | Industry, Innovation and Infrastructure | Integrates IoT, cloud computing, and smart automation into household infrastructure |
| **SDG 11** | Sustainable Cities and Communities | Helps build resilient homes through proactive leak prevention |
| **SDG 12** | Responsible Consumption and Production | Encourages mindful water use via transparent analytics and early leak detection |
