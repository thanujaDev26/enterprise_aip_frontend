import { decisionApi } from '../api/decisionApi';

export const decisionService = {
  prioritize: (payload) => decisionApi.prioritize(payload),
  optimizeAssets: (payload) => decisionApi.optimizeAssets(payload),
};
