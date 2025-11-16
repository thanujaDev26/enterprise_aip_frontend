export const API_BASE_URL = 'http://localhost:8080/api/v1';

export const ENDPOINTS = {
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  PROJECTS: '/projects',
  ASSETS: '/assets',
  ASSET_SUMMARY: (code) => `/assets/summary/${code}`,
  DECISION_PRIORITIZE: '/decisions/prioritize',
  DECISION_OPTIMIZE: '/decision/assets/optimize',
};
