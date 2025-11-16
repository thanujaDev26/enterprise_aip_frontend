import create from 'zustand';
import { projectService } from '../services/projectService';

export const useProjectStore = create((set) => ({
  projects: [],
  loading: false,
  fetchProjects: async () => {
    set({ loading: true });
    try {
      const res = await projectService.list();
      set({ projects: res?.data?.data || [] });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));
