# Institute Management System (IMS)

A comprehensive, full-stack management solution for educational institutes, featuring role-based access control, academic tracking, and administrative management.

## 🚀 Overview

The Institute Management System (IMS) is designed to streamline operations for schools, colleges, and coaching centers. It provides dedicated modules for Administrators, Teachers, Students, and Accountants to manage the entire academic lifecycle efficiently.

## ✨ Key Features

-   **Role-Based Access Control (RBAC)**: Secure access for Admin, Teacher, Student, and Accountant roles.
-   **Dashboard Analytics**: Real-time overview of institute statistics for administrators.
-   **Student Management**: Registration, course enrollment, and performance tracking.
-   **Faculty Management**: Profile management and course assignments.
-   **Academic Management**: Course creation, exam scheduling, and timetable management.
-   **Attendance System**: Automated attendance tracking for students and teachers.
-   **Fee Management**: Transparent tracking of student fees, payments, and dues.
-   **JWT Authentication**: Secure stateless authentication using JSON Web Tokens.

## 🛠️ Tech Stack

### Frontend
-   **React 19**: Modern UI library for building dynamic interfaces.
-   **Redux Toolkit**: Efficient state management.
-   **React Router 7**: Declarative routing and navigation.
-   **Vite**: Next-generation frontend tooling for fast builds.
-   **Bootstrap 5**: Responsive design and components.
-   **React Toastify**: Intuitive notifications for user actions.

### Backend
-   **Spring Boot 3.5**: Robust Java framework for enterprise applications.
-   **Java 17**: Modern language features and performance.
-   **Spring Security**: Production-grade security and authorization.
-   **JJWT (JSON Web Token)**: Secure token generation and validation.
-   **Hibernate/JPA**: ORM for seamless database interaction.

### Database
-   **MySQL**: Relational database for persistent storage.

## 📦 Project Structure

```text
├── IMS_Server/               # Backend Spring Boot Project
│   └── ims-backend/
│       ├── src/main/java/    # Java Source Code
│       ├── src/main/resources/ # Configuration & Properties
│       └── pom.xml           # Maven Dependencies
├── IMS_Client/               # Frontend React Project
│   ├── src/                  # Components, Hooks, Redux slices
│   ├── public/               # Static Assets
│   └── package.json          # Node.js Dependencies
└── netlify.toml              # Frontend Deployment Configuration
```

## ⚙️ Setup & Installation

### Prerequisites
-   Java 17 or higher
-   Maven 3.x
-   Node.js 18.x or higher
-   MySQL Server

### Backend Setup
1.  Navigate to `IMS_Server/ims-backend`.
2.  Configure your MySQL credentials in `src/main/resources/application.properties`.
3.  Set the `JWT_SECRET` and `ALLOWED_ORIGINS` environment variables.
4.  Run the application:
    ```bash
    mvn clean spring-boot:run
    ```

### Frontend Setup
1.  Navigate to `IMS_Client`.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file and set the API base URL:
    ```env
    VITE_API_BASE_URL=http://localhost:8080/api
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

## 🌐 Deployment

### Backend (Railway / Render)
Ensure the following environment variables are set on your hosting platform:
-   `SPRING_DATASOURCE_URL`
-   `SPRING_DATASOURCE_USERNAME`
-   `SPRING_DATASOURCE_PASSWORD`
-   `JWT_SECRET`
-   `ALLOWED_ORIGINS` (Target frontend URL)

### Frontend (Netlify)
-   Point the build command to `npm run build`.
-   Set the publish directory to `dist`.
-   Configure the `VITE_API_BASE_URL` environment variable.

## � Developers

This project was built with ❤️ by:
-   **Harshit Mishra**
-   **Shubham Bhambure**
-   **Pankaj Khare**
-   **Tushar Sonawane**
-   **Shubham Barhate**

## �📄 License
This project is licensed under the MIT License.
