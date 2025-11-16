import {create} from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('accessToken') || null,
  user: null,
  setAuth: (token) => set({ token }),
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem('accessToken');
    set({ token: null, user: null });
    window.location.href = '/login';
  },
}));

export default useAuthStore;
