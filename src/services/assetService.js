import { assetApi } from '../api/assetApi';

export const assetService = {
  create: (payload) => assetApi.create(payload),
  listByProject: (code, page, size) => assetApi.listByProject(code, page, size),
  summary: (code) => assetApi.summary(code),
};
