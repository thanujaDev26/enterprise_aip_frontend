import useAuthStore from '../store/useAuthStore';
import { useCallback } from 'react';

export default function useAuth() {
  const token = useAuthStore((s) => s.token);
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);

  const isAuthenticated = !!token;

  return { token, setAuth, logout, isAuthenticated, rehydrate: useCallback(() => {
    const t = localStorage.getItem('accessToken');
    if (t) setAuth(t);
  }, [setAuth]) };
}
