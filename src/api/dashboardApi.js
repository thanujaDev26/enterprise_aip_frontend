import axiosClient from "./axiosClient";

export const dashboardApi = {
  get: (payload) => axiosClient.get('/dashboard/stats', payload),
};
