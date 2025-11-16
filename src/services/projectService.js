import { projectApi } from '../api/projectApi';

export const projectService = {
  create: (payload) => projectApi.create(payload),
  list: (params) => projectApi.list(params),
  get: (code) => projectApi.get(code),
};
