# TukangAC Dashboard

A comprehensive dashboard application for TukangAC (AC Repair Service) built with React, TypeScript, and modern web technologies.

## 🚀 Features

### Core Functionality
- **Role-based Authentication**: Admin, Technician, and Customer roles with JWT
- **Customer Management**: CRUD operations for customer data
- **Technician Management**: Manage technician profiles and specializations
- **Service Management**: Define and manage AC service offerings
- **Schedule Management**: Book and track service appointments
- **Invoice Management**: Generate, track, and manage invoices
- **Dashboard Analytics**: Statistics and charts for business insights

### Technical Features
- **Modern React Stack**: React 18 + TypeScript + Vite
- **UI/UX**: shadcn/ui components with TailwindCSS
- **State Management**: Zustand for auth state, React Query for server state
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion for smooth transitions
- **Testing**: Vitest + React Testing Library
- **Docker**: Containerized deployment ready

## 🏗️ Architecture

### Frontend Structure
```
src/
├── api/           # API client and React Query hooks
├── components/    # Reusable UI components (shadcn/ui)
├── hooks/         # Custom React hooks
├── layouts/       # Layout components per user role
├── pages/         # Page components organized by feature
├── routes/        # Routing configuration and guards
├── store/         # Zustand state management
├── types/         # TypeScript type definitions
├── utils/         # Helper functions and utilities
└── lib/           # Utility libraries and configurations
```

### Key Components

#### Authentication & Authorization
- JWT-based authentication with automatic token refresh
- Role-based route protection
- Persistent auth state management

#### Data Management
- React Query for server state management
- Axios with interceptors for API communication
- Optimistic updates and error handling

#### UI/UX Design System
- Professional black and blue color scheme
- Responsive design (mobile-first approach)
- Consistent spacing using 8px grid system
- Smooth animations and micro-interactions
- Accessible design with proper focus states

## 🛠️ Tech Stack

### Core Technologies
- **React 18** - UI library with hooks and concurrent features
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework

### UI & Components
- **shadcn/ui** - High-quality, accessible components
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful icons
- **Framer Motion** - Animation library
- **Recharts** - Chart library for React

### State & Data
- **React Query (TanStack Query)** - Server state management
- **Zustand** - Client state management
- **React Hook Form** - Form handling
- **Zod** - Runtime type validation
- **Axios** - HTTP client

### Development & Testing
- **Vitest** - Testing framework
- **React Testing Library** - React component testing
- **ESLint** - Code linting
- **TypeScript** - Static type checking

### Deployment
- **Docker** - Containerization
- **Nginx** - Web server for production
- **Docker Compose** - Multi-container orchestration

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker & Docker Compose (for full stack)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tukang-ac-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm run test
   ```

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

   This starts:
   - Frontend (React app) on port 3000
   - Backend API on port 8080
   - PostgreSQL database on port 5432
   - Redis cache on port 6379

2. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:8080
   - Database: localhost:5432

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api/v1

# Development
VITE_NODE_ENV=development
```

### Database Setup

The application uses PostgreSQL with the schema defined in `init.sql`. The Docker setup automatically initializes the database with:

- User roles and authentication tables
- Customer, Technician, Service entities
- Schedule and Invoice management tables
- Sample data for development

## 👥 User Roles & Permissions

### Admin
- Full access to all features
- Manage customers, technicians, services
- View all schedules and invoices
- Access to analytics dashboard

### Technician
- View assigned schedules
- Update job status (pending → in progress → completed)
- Access customer information for assigned jobs
- View related invoices

### Customer
- View personal booking history
- Access personal invoices
- Download invoice PDFs
- View service history

## 📱 Features by Role

### Admin Dashboard
- Business statistics and KPIs
- Revenue and service distribution charts
- Customer and technician management
- Service catalog management
- Invoice and payment tracking

### Technician Dashboard
- Daily/weekly schedule view
- Job status updates
- Customer contact information
- Navigation and job details

### Customer Dashboard
- Service booking history
- Invoice and payment status
- Service ratings and feedback
- Profile management

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Component Tests
```bash
npm run test:ui
```

### Integration Tests
Tests cover:
- Authentication flows
- Protected routes
- Form validations
- API integration
- User interactions

## 📚 API Integration

### Backend Requirements

The frontend expects a REST API with the following endpoints:

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout

#### Entities
- `GET/POST/PUT/DELETE /customers` - Customer CRUD
- `GET/POST/PUT/DELETE /technicians` - Technician CRUD
- `GET/POST/PUT/DELETE /services` - Service CRUD
- `GET/POST/PUT/DELETE /schedules` - Schedule CRUD
- `GET/POST/PUT/DELETE /invoices` - Invoice CRUD

#### Dashboard
- `GET /dashboard/stats` - Business statistics
- `GET /dashboard/revenue` - Revenue data
- `GET /dashboard/services-chart` - Service distribution

## 🚀 Deployment

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy with Docker**
   ```bash
   docker build -t tukang-ac-frontend .
   docker run -p 80:80 tukang-ac-frontend
   ```

3. **Deploy to cloud providers**
   - Vercel: `vercel --prod`
   - Netlify: `npm run build` then deploy `dist/` folder
   - AWS/GCP: Use provided Docker container

### Environment Setup

Ensure the following environment variables are configured for production:

```env
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
VITE_NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use provided ESLint configuration
- Write tests for new features
- Follow component composition patterns
- Use semantic commit messages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

Built with ❤️ for TukangAC - Professional AC Service Management