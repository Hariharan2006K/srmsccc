# Student Report Management System (SRMS)

This repository contains a lightweight, vanilla JavaScript Student Report Management System (SRMS) — a multi-page frontend app that demonstrates role-based views, student records management, feedback/messages, and a polished UI.

Built for demonstration and learning purposes; it uses browser `localStorage` for persistence and no backend.

## Highlights

- Multi-role login: **Admin**, **Student**, and **Parent** portals.
- Admin: full CRUD for student records, view/manage feedback and parent messages.
- Student: view-only personal academic record and submit feedback.
- Parent: view their child's record and send messages to school (visible to Admin).
- Responsive, modern UI with CSS variables, gradients and micro-interactions.

## Demo Credentials

- Admin: username `admin` / password `admin123`
- Students (example):
	- `S001` / `student123` (John Smith)
	- `S002` / `student123` (Emma Johnson)
	- `S003` / `student123` (Michael Brown)
	- `S004` / `student123` (Sarah Davis)
- Parents (linked to students):
	- `parent1@email.com` / `parent123` (linked to S001)
	- `parent2@email.com` / `parent123` (linked to S002)
	- `parent3@email.com` / `parent123` (linked to S003)
	- `parent4@email.com` / `parent123` (linked to S004)

## File Structure (important files)

- `index.html` — Login page (Admin / Student / Parent tabs)
- `admin-dashboard.html` — Admin interface (student management, feedback)
- `student-dashboard.html` — Student portal (view record, submit feedback)
- `parent-dashboard.html` — Parent portal (view child, send message)
- `auth.js` — Authentication logic and demo data (students, parents)
- `admin-script.js` — Admin dashboard behavior (CRUD, feedback UI)
- `student-script.js` — Student dashboard behavior
- `parent-script.js` — Parent dashboard behavior
- `script.js` — Shared utilities (tab switching, helpers)
- `styles.css` — Centralized styles (CSS variables, components)

## How to run (local)

1. Open the project folder in your file explorer.
2. Open `index.html` in your browser (double-click or right-click → Open with).
3. Use the demo credentials above to log in as Admin / Student / Parent.

Notes:
- The app stores data in the browser `localStorage` (students, feedback, sessions). Clearing browser storage will reset the demo data.
- No server is required; this is a static front-end demo. For advanced testing, serve with a static server (e.g., `npx http-server` or `python -m http.server`).

## Development notes

- To add or edit demo students, update `auth.js` (the `students` array) or use the Admin UI to persist updates in `localStorage`.
- Parent messages are stored alongside student feedback in `localStorage` and are visible to the Admin feedback view.

## Next steps (suggested)

- Add a minimal backend (Node/Express) to persist data in a database.
- Add authentication flow with hashed passwords.
- Export/print student reports as PDF.

---

