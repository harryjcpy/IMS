# Institute Management System (IMS)

A comprehensive, full-stack management solution for educational institutes, featuring role-based access control, academic tracking, and administrative management with a **polyglot microservices architecture**.

## :book: Overview

The Institute Management System (IMS) is designed to streamline operations for schools, colleges, and coaching centers. It provides dedicated modules for Administrators, Teachers, Students, and Accountants to manage the entire academic lifecycle efficiently.

**Key Highlight:** This project demonstrates a modern **polyglot microservices architecture** with Java (Spring Boot) and C# (ASP.NET Core) working together seamlessly.

## :star: Key Features

- **Role-Based Access Control (RBAC)**: Secure access for Admin, Teacher, Student, and Accountant roles
- **Dashboard Analytics**: Real-time overview of institute statistics for administrators
- **Student Management**: Registration, course enrollment, and performance tracking
- **Faculty Management**: Profile management and course assignments
- **Academic Management**: Course creation, exam scheduling, and timetable management
- **Attendance System**: Automated attendance tracking for students and teachers
- **Fee Management**: Transparent tracking of student fees, payments, and dues
- **JWT Authentication**: Secure stateless authentication using JSON Web Tokens
- **Audit Logging**: Comprehensive audit trail for all CRUD operations via microservice

## :building_construction: Architecture

### Microservices Design

This project implements a **polyglot microservices architecture** with three main services:

```
Frontend (React) <---> Backend (Spring Boot) <---> Audit Service (ASP.NET Core)
                              |                              |
                              v                              v
                        PostgreSQL                       SQLite
```

#### 1. Frontend Service (React + Vite)
- **Technology**: React 19, Redux Toolkit, React Router 7
- **Deployment**: Netlify
- **Purpose**: User interface and client-side routing

#### 2. Backend Service (Spring Boot)
- **Technology**: Java 17, Spring Boot 3.5, Spring Security
- **Deployment**: Render
- **Database**: PostgreSQL (Render managed)
- **Purpose**: Business logic, authentication, and data management

#### 3. Audit Logging Service (ASP.NET Core)
- **Technology**: C# .NET 8, Minimal API, Entity Framework Core
- **Deployment**: Render (Docker)
- **Database**: SQLite (ephemeral storage)
- **Purpose**: Non-intrusive audit trail for compliance

### Communication Pattern

- **Frontend <-> Backend**: RESTful HTTP/JSON
- **Backend <-> Audit Service**: HTTP POST via Spring AOP (Aspect-Oriented Programming)
- **Pattern Used**: Sidecar Pattern for cross-cutting concerns

## :computer: Tech Stack

### Frontend
- **React 19**: Modern UI library for building dynamic interfaces
- **Redux Toolkit**: Efficient state management
- **React Router 7**: Declarative routing and navigation
- **Vite**: Next-generation frontend tooling for fast builds
- **Bootstrap 5**: Responsive design and components
- **React Toastify**: Intuitive notifications for user actions

### Backend (Spring Boot)
- **Spring Boot 3.5**: Robust Java framework for enterprise applications
- **Java 17**: Modern language features and performance
- **Spring Security**: Production-grade security and authorization
- **Spring AOP**: Aspect-Oriented Programming for audit logging
- **JJWT (JSON Web Token)**: Secure token generation and validation
- **Hibernate/JPA**: ORM for seamless database interaction

### Audit Service (ASP.NET Core)
- **ASP.NET Core 8**: High-performance web framework
- **C# 12**: Modern language features
- **Entity Framework Core**: ORM for SQLite
- **Minimal API**: Lightweight endpoint definitions

### Databases
- **PostgreSQL**: Primary relational database for business data (Render managed)
- **SQLite**: Lightweight database for audit logs (file-based)

### DevOps & Deployment
- **Docker**: Containerization for ASP.NET service
- **Render**: Cloud platform for backend and audit services
- **Netlify**: Static site hosting for React frontend
- **Git/GitHub**: Version control and CI/CD

## :file_folder: Project Structure

```
IMS/
├── IMS_Server/                 # Backend Spring Boot Project
│   └── ims-backend/
│       ├── src/main/java/
│       │   └── com/ims/
│       │       ├── config/     # AuditConfig, SecurityConfig
│       │       ├── controller/ # REST Controllers
│       │       ├── dto/        # Data Transfer Objects (AuditLogDTO)
│       │       ├── entity/     # JPA Entities
│       │       ├── repository/ # Spring Data Repositories
│       │       ├── service/    # Business Logic
│       │       └── util/       # AuditAspect (AOP)
│       ├── src/main/resources/
│       │   └── application.properties
│       └── pom.xml
│
├── IMS_Client/                 # Frontend React Project
│   ├── src/
│   │   ├── components/         # React Components
│   │   ├── redux/              # Redux Slices
│   │   ├── services/           # API Services
│   │   └── utils/              # Constants, Helpers
│   ├── public/
│   │   └── _redirects          # Netlify SPA routing
│   └── package.json
│
├── IMS_Audit/                  # Audit Logging Microservice
│   ├── Program.cs              # ASP.NET Minimal API
│   ├── AuditDbContext.cs       # EF Core DbContext
│   ├── AuditLog.cs             # Entity Model
│   ├── Dockerfile              # Docker configuration
│   ├── .dockerignore
│   └── IMS_Audit.csproj
│
└── netlify.toml                # Frontend Deployment Config
```

## :wrench: Setup & Installation

### Prerequisites
- Java 17 or higher
- Maven 3.x
- Node.js 18.x or higher
- .NET 8 SDK (for audit service)
- PostgreSQL (for local development)

### Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd IMS_Server/ims-backend
   ```

2. Configure `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/ims_db
   spring.datasource.username=postgres
   spring.datasource.password=your_password
   jwt.secret=your_secret_key
   audit.service.url=http://localhost:5158/api/audit
   ```

3. Run the application:
   ```bash
   mvn clean spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd IMS_Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:5173`

### Audit Service Setup (ASP.NET Core)

1. Navigate to the audit service directory:
   ```bash
   cd IMS_Audit
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the service:
   ```bash
   dotnet run
   ```

The audit service will start on `http://localhost:5158`

## :rocket: Deployment

### Backend (Render)

**Environment Variables:**
- `SPRING_DATASOURCE_URL`: PostgreSQL connection string
- `SPRING_DATASOURCE_USERNAME`: Database username
- `SPRING_DATASOURCE_PASSWORD`: Database password
- `JWT_SECRET`: Secret key for JWT signing
- `AUDIT_SERVICE_URL`: URL of the deployed audit service

**Build Command:** `mvn clean install`
**Start Command:** `java -jar target/ims-backend-0.0.1-SNAPSHOT.jar`

### Audit Service (Render - Docker)

**Environment Variables:**
- `PORT`: Auto-assigned by Render
- `ASPNETCORE_ENVIRONMENT`: Production

**Build:** Automatic via Dockerfile
**Root Directory:** `IMS_Audit`

### Frontend (Netlify)

**Build Settings:**
- **Base Directory:** `IMS_Client`
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`

**Environment Variables:**
- `VITE_API_BASE_URL`: URL of the deployed backend

## :mag: How It Works: Audit Logging

The audit logging system uses **Spring AOP (Aspect-Oriented Programming)** to non-intrusively capture all CRUD operations:

1. **User performs action** (e.g., adds a student)
2. **Controller method executes** and saves data to PostgreSQL
3. **AOP Aspect intercepts** the method after successful execution
4. **Metadata is extracted**: User ID, Action (CREATE/UPDATE/DELETE), Resource (Controller name)
5. **HTTP POST request** is sent to the ASP.NET Audit Service
6. **Audit Service saves** the log to SQLite database
7. **Main application continues** normally (fault-tolerant design)

**Key Files:**
- `AuditAspect.java`: Spring AOP aspect that intercepts controller methods
- `AuditConfig.java`: Enables AOP and configures RestTemplate
- `Program.cs`: ASP.NET Minimal API with POST/GET endpoints
- `AuditDbContext.cs`: Entity Framework Core database context

## :link: API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Add new student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

### Teachers
- `GET /api/teachers` - Get all teachers
- `POST /api/teachers` - Add new teacher
- `PUT /api/teachers/{id}` - Update teacher
- `DELETE /api/teachers/{id}` - Delete teacher

### Audit Logs
- `GET /api/audit` - Get all audit logs (ASP.NET service)
- `POST /api/audit` - Create audit log (internal use)

## :key: Default Credentials

**Admin:**
- Email: `admin@ims.com`
- Password: `admin123`

## :busts_in_silhouette: Developers

This project was built by:
- **Harshit Mishra**
- **Shubham Bhambure**
- **Pankaj Khare**
- **Tushar Sonawane**
- **Shubham Barhate**

## :globe_with_meridians: Live Demo

- **Frontend**: https://ourims.netlify.app
- **Backend API**: https://ims-backend.onrender.com
- **Audit Service**: https://ims-audit-service.onrender.com

## :bulb: Future Enhancements

- Persistent storage for audit logs (PostgreSQL migration)
- Real-time notifications using WebSockets
- Advanced analytics dashboard
- Mobile application (React Native)
- Automated report generation
