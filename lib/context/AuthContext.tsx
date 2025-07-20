'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
    token: string | undefined;
    role: string | undefined;
    isLoggedIn: boolean;
    setData: (token: string, role: string) => void;
    removeData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | undefined>(undefined);
    const [role, setRole] = useState<string | undefined>(undefined);

    const isLoggedIn = !!token;

    useEffect(() => {
        const storedToken = Cookies.get('token');
        const storedRole = Cookies.get('role');
        if (storedToken) setToken(storedToken);
        if (storedRole) setRole(storedRole);
    }, []);

    const setData = (token: string, role: string) => {
        Cookies.set('token', token, { expires: 7 });
        Cookies.set('role', role, { expires: 7 });
        setToken(token);
        setRole(role);
    };

    const removeData = () => {
        Cookies.remove('token');
        Cookies.remove('role');
        setToken(undefined);
        setRole(undefined);
    };

    return (
        <AuthContext.Provider value={{ token, role, isLoggedIn, setData, removeData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
