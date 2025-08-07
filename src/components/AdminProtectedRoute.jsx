import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const AdminProtectedRoute = ({ children }) => {
    const { isAdminAuthenticated } = useAdminAuth();
    const location = useLocation();

    if (!isAdminAuthenticated) {
        return <Navigate to="/admin-login" state={{ from: location }} replace />;
    }

    return children;
};

export default AdminProtectedRoute;