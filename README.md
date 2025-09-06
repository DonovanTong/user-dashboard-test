 User Dashboard Trial#

A simple user dashboard built with **Next.js**, **Tailwind CSS**, and **TypeScript**. 
Includes a mock backend, API, and a responsive frontend for searching and editing users.

## Getting Started

1. Install dependencies:
    ```bash
    npm install
2. Run dev server:
    ```bash
    npm run dev
3. Open http://localhost:3000

## Features
### Backend API
- GET /api/users 
- GET /api/users/[id]
- PATCH /api/users[id]
### Frontend
- Dashboard list view
- Live search by name
- Detail page with edit form
- Design with Tailwind

## Tech Stack
- Next.js (React + Node.js)
- Tailwind CSS
- Typescript
- In-memory backend

### Time Spent
- Environments review and setup (VS code, nvm, Next.js) ~ 2 hours
- Learning and reviewing basics (JavaScript, Next.js, React, Git/Github, Readme): ~ 5 hours
- Setting up page.tsx (html) ~ 2 hours
- Users and user functions. Search connected to API and API working at api/users (GET requests, API) ~ 2 hours
- Detail page working. Add /user/[id]/page.tsx and troubleshooting ~ 1 hour
- Edit form (PATCH requests) ~ 1 hour
- Styling with Tailwind CSS ~ 1 hour
Note: debugging troubleshooting throughout whole process