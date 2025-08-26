// src/auth/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { get, post } from '../lib/api';

const STORAGE_KEY = 'auth-v1';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // estado inicial (lendo do localStorage, se houver)
  const [auth, setAuth] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // persiste / remove no localStorage quando o estado muda
  useEffect(() => {
    try {
      if (auth?.token) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
        localStorage.setItem('token', auth.token); // cópia simples p/ api.js
      } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('token');
      }
    } catch {
      /* ignore */
    }
  }, [auth]);

  // LOGIN REAL (POST /login)
  const login = async (email, password) => {
    const data = await post('/login', { email, password });
    if (!data?.token) throw new Error('Token não recebido');
    setAuth({ token: data.token });
    return data.token;
  };

  // LOGOUT
  const logout = () => setAuth(null);

  // Exemplo de chamada protegida (usa Authorization automaticamente via api.js)
  const fetchProtected = async () => {
    if (!auth?.token) throw new Error('Sem token');
    return get('/protegido');
  };

  const value = useMemo(
    () => ({
      auth,
      token: auth?.token ?? null,
      isAuthenticated: !!auth?.token,
      login,
      logout,
      fetchProtected,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
