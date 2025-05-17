import { apiService } from '@/serveces/http-service-instance';

export interface AuthApi {
  refreshTokens: () => Promise<void>;
}

export const authApi: AuthApi = {
  refreshTokens: async () => {
    await apiService.post('auth/refresh', {});
  },
};
