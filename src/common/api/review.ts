import { apiService } from '@/serveces/http-service-instance';
import {
  CreateReviewDto,
  FindManyDocumentsDto,
  PersonalFilterForFilmsResponseSchema,
  ReviewResponseSchema,
  ReviewSchema,
  ReviewsWithUserResponseSchema,
  ReviewWithUserAndFilmResponseSchema,
  UpdateReviewDto,
} from '@/common/types-validation';

export const reviewsApi = {
  baseUrl: '/reviews',

  create: async (data: CreateReviewDto) => {
    return apiService.post(`${reviewsApi.baseUrl}`, data, {
      schema: ReviewResponseSchema,
    });
  },

  findAll: async (params: FindManyDocumentsDto) => {
    return apiService.get(`${reviewsApi.baseUrl}`, {
      schema: ReviewsWithUserResponseSchema,
      queryParams: params,
    });
  },

  findOne: async (id: string) => {
    return apiService.get(`${reviewsApi.baseUrl}/${id}`, {
      schema: ReviewSchema,
    });
  },

  findByFilm: async (filmId: string, params?: FindManyDocumentsDto) => {
    return apiService.get(`${reviewsApi.baseUrl}/film/${filmId}`, {
      schema: ReviewsWithUserResponseSchema,
      queryParams: params,
    });
  },

  update: async (id: string, data: UpdateReviewDto) => {
    return apiService.patch(`${reviewsApi.baseUrl}/${id}`, data, {
      schema: ReviewResponseSchema,
    });
  },

  remove: async (id: string) => {
    return apiService.delete(
      `${reviewsApi.baseUrl}/${id}`,
      {},
      {
        schema: ReviewResponseSchema,
      }
    );
  },

  findByUser: async (userId: string) => {
    return apiService.get(`${reviewsApi.baseUrl}/user/${userId}`, {
      schema: ReviewWithUserAndFilmResponseSchema,
    });
  },

  getPersonalFilterForFilms: async (userId: string) => {
    return apiService.get(`${reviewsApi.baseUrl}/personal/filters/${userId}`, {
      schema: PersonalFilterForFilmsResponseSchema,
    });
  },
};
