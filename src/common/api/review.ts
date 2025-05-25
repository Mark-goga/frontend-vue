import { apiService } from '@/serveces/http-service-instance';
import {
  CreateReviewDto,
  FindManyDocumentsDto,
  ReviewResponseSchema,
  ReviewSchema,
  ReviewsWithUserResponseSchema,
  UpdateReviewDto,
} from '@/common/types-validation';

export const reviewsApi = {
  baseUrl: '/reviews',

  create: async (data: CreateReviewDto) => {
    return await apiService.post(`${reviewsApi.baseUrl}`, data, {
      schema: ReviewResponseSchema,
    });
  },

  findAll: async (params: FindManyDocumentsDto) => {
    return await apiService.get(`${reviewsApi.baseUrl}`, {
      schema: ReviewsWithUserResponseSchema,
      queryParams: params,
    });
  },

  findOne: async (id: string) => {
    return await apiService.get(`${reviewsApi.baseUrl}/${id}`, {
      schema: ReviewSchema,
    });
  },

  findByFilm: async (filmId: string, params?: FindManyDocumentsDto) => {
    return await apiService.get(`${reviewsApi.baseUrl}/film/${filmId}`, {
      schema: ReviewsWithUserResponseSchema,
      queryParams: params,
    });
  },

  update: async (id: string, data: UpdateReviewDto) => {
    return await apiService.patch(`${reviewsApi.baseUrl}/${id}`, data, {
      schema: ReviewSchema,
    });
  },

  remove: async (id: string) => {
    return await apiService.delete(
      `${reviewsApi.baseUrl}/${id}`,
      {},
      {
        schema: ReviewSchema,
      }
    );
  },

  findByUser: async (userId: string) => {
    return await apiService.get(`${reviewsApi.baseUrl}/user/${userId}`, {});
  },
};
