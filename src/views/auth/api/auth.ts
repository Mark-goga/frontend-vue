import { apiService } from '@/serveces/http-service-instance';
import {
  AuthResponseSchema,
  LoginDto,
  RegisterDto,
  RemoveSessionsDto,
  SessionsResponseSchema,
} from '@/views/auth/api/validations';
import { EmptyResponseSchema } from '@/common/types-validation';

export const authApi = {
  baseUrl: '/auth',

  login: async (data: LoginDto) => {
    return await apiService.post(`${authApi.baseUrl}/login`, data, { schema: AuthResponseSchema });
  },

  register: async (data: RegisterDto) => {
    return await apiService.post(`${authApi.baseUrl}/register`, data, {
      schema: AuthResponseSchema,
    });
  },

  refresh: async () => {
    return await apiService.post(`${authApi.baseUrl}/refresh`, {}, { schema: AuthResponseSchema });
  },

  logout: async () => {
    return await apiService.post(`${authApi.baseUrl}/logout`, {}, { schema: EmptyResponseSchema });
  },

  getSessions: async () => {
    return await apiService.get(`${authApi.baseUrl}/sessions`, { schema: SessionsResponseSchema });
  },

  removeSessions: async (data: RemoveSessionsDto) => {
    return await apiService.post(`${authApi.baseUrl}/sessions`, data, {
      schema: EmptyResponseSchema,
    });
  },
};
