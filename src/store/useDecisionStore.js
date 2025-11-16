import create from 'zustand';
import { decisionService } from '../services/decisionService';

export const useDecisionStore = create((set) => ({
  results: [],
  loading: false,
  prioritize: async (payload) => {
    set({ loading: true });
    try {
      const res = await decisionService.prioritize(payload);
      set({ results: res?.data?.data || [] });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
  optimizeAssets: async (payload) => {
    set({ loading: true });
    try {
      const res = await decisionService.optimizeAssets(payload);
      return res?.data?.data;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
