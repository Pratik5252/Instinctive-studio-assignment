
## Overview
Instinctive Studio assignment 📄

## Deployment Instructions

### Prerequisites
- Node.js (version 18.0.0 or higher)
- npm or yarn package manager
- Supabase account and project
- Prisma CLI (installed globally or via npx)

### Local Development Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Pratik5252/Instinctive-studio-assignment.git
   cd Instinctive-studio-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Fill in the required environment variables in the `.env` file:
   ```
   DATABASE_URL=your_supabase_postgres_connection_string
   DIRECT_URL=your_supabase_direct_connection_string
   NEXT_PUBLIC_BASE_URL
   ```

4. Set up the database:
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push database schema to Supabase
   npx prisma db push or npx prisma migrate dev --name init
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

### Database Setup (Supabase + Prisma)

#### Setting up Supabase
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings → Database
3. Copy your connection strings:
   - **Connection pooling string** for `DATABASE_URL`
   - **Direct connection string** for `DIRECT_URL`

#### Prisma Configuration
1. The project uses Prisma as the ORM for Supabase PostgreSQL
2. Database schema is defined in `prisma/schema.prisma`
3. After any schema changes, run:
   ```bash
   npx prisma db push or npx prisma migrate dev --name <migration_name>
   npx prisma generate
   ```

#### Database Commands
- `npx prisma studio` - Open Prisma Studio to view/edit data
- `npx prisma db push` - Push schema changes to database
- `npx prisma generate` - Generate Prisma client
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma db seed` - Seed the database (if configured)

### Production Deployment

#### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `DIRECT_URL` 
   - `NEXT_PUBLIC_BASE_URL` (set to your deployed URL)
3. Deploy automatically on push to main branch
4. Run database setup commands in Vercel dashboard or via CLI before build process:
   ```bash
   npx prisma generate
   ```
## Tech Decisions

### Framework Choice
**Next.js**
- **Reason**: Chose Next.js for its full-stack capabilities, built-in API routes, and excellent developer experience
- **Benefits**: 
 - Server-side rendering (SSR) and static site generation (SSG) for better SEO and performance
 - Built-in API routes eliminate need for separate backend
 - Automatic code splitting and optimization

### State Management & Data Fetching
**React Query (TanStack Query)**
- **Benefits**:
 - Automatic caching and background refetching
 - Optimistic updates and mutation handling
 - Reduced boilerplate compared to traditional state management

### Styling Approach
**Tailwind CSS**
- **Reason**: Utility-first CSS framework for rapid UI development
- **Benefits**: 
 - Consistent design system with predefined spacing, colors, and typography
 - No CSS file bloat - only includes used classes

### Database & ORM
**Supabase PostgreSQL with Prisma ORM**
- **Supabase**: Provides managed PostgreSQL database with real-time features and built-in authentication
- **Prisma**: Type-safe database client and schema management
- **Benefits**: 
 - Full PostgreSQL power with managed infrastructure
 - Type safety with TypeScript auto-generation


## Environment Variables Example
```
# Database Configuration
DATABASE_URL=postgresql://postgres:[password]@[host]:[port]/[database]?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://postgres:[password]@[host]:[port]/[database]

# Application Configuration  
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting
- `npm run test` - Run tests
- `npx prisma studio` - Open database GUI
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema to database
- `npx prisma migrate dev` - Create and apply migrations

## If I had more time... (quick bullets for future improvements)

- I would implement Timeline Component completely and fully functional
- I would have handle data with more efficiency in optimal way by that I mean written the logic clearly
- I would have some more animation or subtle animation 
- Instead of using static Image I would use Video and build logic around that
- I would have utilized Docker for proper containerization and deployment 
