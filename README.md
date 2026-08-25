# CANCare
A caregiving marketplace prototype that connects patients and caregivers
based on needs, location, and price range.

## Project Status
### What's functional:
- PostgreSQL database running in Docker, with a defined schema (`schema.sql`)
- Seed script for development data, using bcrypt for password hashing (`seed.js`)
- Environment-based configuration (`.env`) for local vs. production settings

### What's in progress:
- Express server with `/signup` and `/login` endpoints, tested via curl/Postman
- Migrating existing GUI (login/signup pages) to work with the new backend
- Connecting the existing GUI to the new backend routes
- Session-based authentication

### Planned:
- Landing page introducing the platform to new visitors
- User profile pages (view and edit caregiver/patient details, specialties/needs)
- In-app messaging between caregivers and patients

### Why the refactor:
The original version had no clear separation between frontend and backend logic, alongside security issues, as passwords were being stored in plaintext. By refactoring, CANCare will have a dedicated database layer, RESTful auth routes, and environment-based config, following more standard patterns for a Node/Express/PostgreSQL stack.

## Technology
- HTML
- CSS
- JavaScript
- Node.js / Express
- PostgreSQL

## Getting Started
### Prerequisites
- Node.js
- Docker

### Setup
1. Clone the repo
```bash
   git clone https://github.com/your-username/FINAL_CANCare.git
   cd FINAL_CANCare
```
2. Install dependencies:
```bash
   npm install
```
3. Copy example environment file
```bash
   cp .env.example .env
```
4. Start database container
```bash
   docker-compose -f database/docker-compose.yml up -d
```
5. Apply schema
```bash
   docker exec -i my-postgres psql -U <your_db_user> -d <your_db_name> < database/schema.sql
```
6. Seed the database with development data
```bash
   node database/seed.js
```
