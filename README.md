# DevMockupAI

A powerful application that provides resume and interview preparation tools for developers, helping to tailor resumes to job descriptions and offering interview coaching.

![DevMockupAI](/public/home.png)

## Tech Stack

| Category | Technologies                              |
| -------- | ----------------------------------------- |
| AI tools | RAG, LangChain.js, OpenAI API, Gemini API |
| Frontend | Next.js, TailwindCSS, Shadcn, Antd        |
| Backend  | PostgreSQL, Drizzle ORM, Next.js API      |

## Features

- **Resume Tailoring**: AI-powered tool to tailor your resume to specific job descriptions
- **Interview Coaching**: Get personalized interview preparation advice
- **Tech Stack Matching**: Highlight relevant skills based on job requirements
- **Credit System**: Limits AI generation to 3 credits per user to manage API usage

## AI Credit System

The application includes a credit system to manage AI resource usage:

- Each user receives 3 AI generation credits
- Generating an interview consumes 1 credit
- Using AI to improve a resume section consumes 1 credit
- Credit usage is tracked in the database
- Users can see their remaining credits on the dashboard

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/pandaofhead/DevMockupAI
   cd DevMockupAI
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:

   ```
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
    CLERK_SECRET_KEY=your-clerk-secret-key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

    NEXT_PUBLIC_DRIZZLE_DB_URL=your-database-url

    NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key

    NEXT_PUBLIC_INFORMATION="Please enable your brower's webcams and microphones to start your interview."

    NEXT_PUBLIC_QUESTION_NOTE="Please answer the following questions."
   ```

4. Set up the database

   ```bash
   # Run migrations
   npm run db:push

   # then
   npm run db:studio
   ```

5. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

## AI Integration

The application uses AI models:

- **Google's Gemini**: Used for interview coaching and conversation, and resume tailoring.

To switch between models or configure them further, check the API routes in `app/api/` directory.
