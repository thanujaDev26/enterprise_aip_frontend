import axiosClient from './axiosClient';

export const assetApi = {
  create: (payload) => axiosClient.post('/assets', payload),
  listByProject: (projectCode, page = 0, size = 10, sort = 'name,asc') =>
    axiosClient.get(`/assets/by-project/${projectCode}`, { params: { page, size, sort } }),
  summary: (projectCode) => axiosClient.get(`/assets/summary/${projectCode}`),
};
