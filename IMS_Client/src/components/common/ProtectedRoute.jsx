import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../utils/constants';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case 'ADMIN':
        return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
      case 'STUDENT':
        return <Navigate to={ROUTES.STUDENT_DASHBOARD} replace />;
      case 'TEACHER':
        return <Navigate to={ROUTES.TEACHER_DASHBOARD} replace />;
      case 'ACCOUNTANT':
        return <Navigate to={ROUTES.ACCOUNTANT_DASHBOARD} replace />;
      default:
        return <Navigate to={ROUTES.LOGIN} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
