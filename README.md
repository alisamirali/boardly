# Boardly - Enterprise Project Management Platform

> **The comprehensive project management solution designed for modern teams and organizations**

Boardly is a full-featured project management platform that empowers teams to plan, track, and deliver work efficiently. Built as a modern Jira alternative, it provides enterprise-grade features with an intuitive interface that scales from small teams to large organizations.

## 🎯 Why Boardly?

As a Team Lead, you need tools that:

- **Scale with your team** - From 5 to 500+ members
- **Provide real-time insights** - Make data-driven decisions
- **Streamline workflows** - Reduce overhead and increase productivity
- **Ensure accountability** - Clear ownership and progress tracking
- **Foster collaboration** - Seamless communication and coordination

Boardly delivers on all these requirements with a modern, intuitive interface and powerful backend.

## Key Features

- 🏢 Workspaces
- 📊 Projects / Epics
- ✅ Tasks
- 📋 Kanban Board View
- 🗃️ Data Table View
- 📅 Calendar View
- ✉️ Invite System
- ⚙️ Workspace and Project Settings
- 🔌 Appwrite SDK Integration
- 📈 Analytics Dashboard
- 👥 User Roles and Permissions
- 🔒 Authentication (OAuth and Email)
- 📱 Responsive Design - (Mobile-friendly)

## 🛠️ Technology Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling
- **shadcn/ui** - Modern component library
- **React Query** - Server state management
- **React Hook Form** - Form handling and validation

### Backend

- **Hono.js** - Fast, lightweight web framework
- **Appwrite SDK** - Backend-as-a-Service integration
- **Zod** - Schema validation

### Infrastructure

- **Appwrite Cloud** - Database, authentication, and file storage
- **Vercel** - Deployment and hosting
- **GitHub** - Version control and CI/CD

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Appwrite account and project

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/alisamirali/boardly.git
   cd boardly
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Configure your `.env.local`:

   ```env
   NEXT_PUBLIC_APP_URL=
   NEXT_PUBLIC_APPWRITE_ENDPOINT=
   NEXT_PUBLIC_APPWRITE_PROJECT=
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=
   NEXT_PUBLIC_APPWRITE_WORKSPACES_ID=
   NEXT_PUBLIC_APPWRITE_MEMBERS_ID=
   NEXT_PUBLIC_APPWRITE_PROJECTS_ID=
   NEXT_PUBLIC_APPWRITE_TASKS_ID=
   NEXT_APPWRITE_KEY=
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:4200`

### Production Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Deploy to Vercel**

   ```bash
   vercel --prod
   ```

## 📱 Mobile Experience

Boardly is fully responsive and optimized for mobile devices:

- **Touch-friendly interface** - Optimized for touch interactions
- **Mobile navigation** - Collapsible sidebar and bottom navigation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
