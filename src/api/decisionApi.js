import axiosClient from './axiosClient';

export const decisionApi = {
  prioritize: (payload) => axiosClient.post('/decisions/prioritize', payload),
  optimizeAssets: (payload) => axiosClient.post('/decision/assets/optimize', payload),
};
