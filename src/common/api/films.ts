import { apiService } from '@/serveces/http-service-instance';
import {
  CreateFilmDto,
  FilmDetailsResponseSchema,
  FilmResponseSchema,
  FilmsResponseSchema,
  FindManyDocumentsDto,
  UpdateFilmDto,
} from '@/common/types-validation';

export const filmsApi = {
  baseUrl: '/films',

  create: async (data: CreateFilmDto) => {
    return await apiService.post(`${filmsApi.baseUrl}`, data, {
      schema: FilmResponseSchema,
    });
  },

  findAll: async (params: FindManyDocumentsDto) => {
    return await apiService.get(`${filmsApi.baseUrl}`, {
      schema: FilmsResponseSchema,
      queryParams: params,
    });
  },

  findOne: async (id: string) => {
    return await apiService.get(`${filmsApi.baseUrl}/${id}`, {
      schema: FilmDetailsResponseSchema,
    });
  },

  update: async (id: string, data: UpdateFilmDto) => {
    return await apiService.patch(`${filmsApi.baseUrl}/${id}`, data, {
      schema: FilmResponseSchema,
    });
  },

  remove: async (id: string) => {
    return await apiService.delete(
      `${filmsApi.baseUrl}/${id}`,
      {},
      {
        schema: FilmResponseSchema,
      }
    );
  },
};
