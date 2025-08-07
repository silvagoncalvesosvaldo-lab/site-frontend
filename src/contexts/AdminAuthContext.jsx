import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
    return useContext(AdminAuthContext);
};

export const AdminAuthProvider = ({ children }) => {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
        const storedAuth = sessionStorage.getItem('isAdminAuthenticated');
        return storedAuth === 'true';
    });

    const login = () => {
        sessionStorage.setItem('isAdminAuthenticated', 'true');
        setIsAdminAuthenticated(true);
    };

    const logout = () => {
        sessionStorage.removeItem('isAdminAuthenticated');
        setIsAdminAuthenticated(false);
    };

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'isAdminAuthenticated') {
                setIsAdminAuthenticated(sessionStorage.getItem('isAdminAuthenticated') === 'true');
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const value = {
        isAdminAuthenticated,
        login,
        logout,
    };

    return (
        <AdminAuthContext.Provider value={value}>
            {children}
        </AdminAuthContext.Provider>
    );
};