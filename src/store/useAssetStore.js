import create from 'zustand';
import { assetService } from '../services/assetService';

export const useAssetStore = create((set) => ({
  assets: [],
  summary: null,
  loading: false,
  fetchByProject: async (code) => {
    set({ loading: true });
    try {
      const res = await assetService.listByProject(code);
      set({ assets: res?.data?.data?.content || [] });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
  fetchSummary: async (code) => {
    set({ loading: true });
    try {
      const res = await assetService.summary(code);
      set({ summary: res?.data?.data || null });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));
