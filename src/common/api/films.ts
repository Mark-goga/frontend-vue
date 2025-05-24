import { apiService } from '@/serveces/http-service-instance';
import { createApiResponseSchema } from '@/common/api/validation';
import { FindManyDocumentsDto, PaginationSchema } from '@/common/types-validation';
import { z } from 'zod';

const FilmSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  director: z.string(),
  releaseDate: z.string(),
  genre: z.array(z.string()),
  estimation: z.number(),
  backGroundImageKey: z.string().optional(),
  avatarImageKey: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const FilmsResponseSchema = createApiResponseSchema(
  z.object({
    films: z.array(FilmSchema),
    pagination: PaginationSchema,
  })
);

const FilmResponseSchema = createApiResponseSchema(FilmSchema);
export type FilmResponse = z.infer<typeof FilmResponseSchema>;
export type Film = z.infer<typeof FilmSchema>;

export type CreateFilmDto = {
  title: string;
  description: string;
  director: string;
  releaseDate: string;
  genre: string;
  backGroundImageKey?: string;
};

export type UpdateFilmDto = {
  title?: string;
  description?: string;
  director?: string;
  releaseDate?: string;
  genre?: string;
  backGroundImageKey?: string;
};

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
      schema: FilmResponseSchema,
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
