import { z } from 'zod';
import { HttpService } from '@/serveces/http-service';
import { HttpError } from '@/serveces/types';
import { authApi } from '@/serveces/auth-api';

export const apiService = new HttpService('http://localhost:3000', {
  onError: async (error, requestFn, schema) => {
    const httpError = error as HttpError;

    if (httpError.status === 401 && httpError.message === 'Token expired or invalid') {
      try {
        await authApi.refreshTokens();

        const newResponse = await requestFn();

        if (schema) {
          return schema.parse(newResponse);
        }
        return newResponse;
      } catch (refreshError) {
        return {
          error: 'Сесія закінчилася. Будь ласка, увійдіть знову',
        };
      }
    }

    return {
      error: httpError.message || 'Невідома помилка',
    };
  },
  onResponse: (data, schema) => {
    try {
      if (schema) {
        return schema.parse(data);
      }
      return data;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          error: `Validation error: ${error.errors.map((e) => e.message).join(', ')}`,
        };
      }
      return {
        error: error instanceof Error ? error.message : 'Невідома помилка валідації',
      };
    }
  },
});
