import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/auth/Login';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminHome from './components/admin/AdminHome';
import UserManagement from './components/admin/UserManagement';
import StudentManagement from './components/admin/StudentManagement';
import TeacherManagement from './components/admin/TeacherManagement';
import CourseManagement from './components/admin/CourseManagement';
import AccountantManagement from './components/admin/AccountantManagement';
import ExamManagement from './components/admin/ExamManagement';
import EnrollmentManagement from './components/admin/EnrollmentManagement';
import StudentDashboard from './components/student/StudentDashboard';
import StudentHome from './components/student/StudentHome';
import MyCourses from './components/student/MyCourses';
import MyResults from './components/student/MyResults';
import MyAttendance from './components/student/MyAttendance';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import TeacherHome from './components/teacher/TeacherHome';
import TeacherCourses from './components/teacher/TeacherCourses';
import MarkAttendance from './components/teacher/MarkAttendance';
import EnterResults from './components/teacher/EnterResults';
import AccountantDashboard from './components/accountant/AccountantDashboard';
import AccountantHome from './components/accountant/AccountantHome';
import FeesManagement from './components/accountant/FeesManagement';
import Reports from './components/accountant/Reports';
import ChangePassword from './components/common/ChangePassword';
import './App.css';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/" element={isAuthenticated ? <Navigate to="/admin" replace /> : <Navigate to="/login" replace />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="teachers" element={<TeacherManagement />} />
          <Route path="accountants" element={<AccountantManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="exams" element={<ExamManagement />} />
          <Route path="enrollments" element={<EnrollmentManagement />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<ProtectedRoute allowedRoles={['STUDENT']}><StudentDashboard /></ProtectedRoute>}>
          <Route index element={<StudentHome />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="results" element={<MyResults />} />
          <Route path="attendance" element={<MyAttendance />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher" element={<ProtectedRoute allowedRoles={['TEACHER']}><TeacherDashboard /></ProtectedRoute>}>
          <Route index element={<TeacherHome />} />
          <Route path="courses" element={<TeacherCourses />} />
          <Route path="attendance" element={<MarkAttendance />} />
          <Route path="results" element={<EnterResults />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* Accountant Routes */}
        <Route path="/accountant" element={<ProtectedRoute allowedRoles={['ACCOUNTANT']}><AccountantDashboard /></ProtectedRoute>}>
          <Route index element={<AccountantHome />} />
          <Route path="fees" element={<FeesManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
