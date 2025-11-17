import axiosClient from "./axiosClient";

export const projectApi = {
  create: (payload) => axiosClient.post('/projects', payload),
  list: (params) => axiosClient.get('/projects', { params }),
  get: (code) => axiosClient.get(`/projects/${code}`),
  update: (code, payload) => axiosClient.put(`/projects/${code}`, payload),
  delete: (code) => axiosClient.delete(`/projects/${code}`),
  getAssetSummary: (projectCode) =>
    axiosClient.get(`/assets/summary/${projectCode}`),
};
