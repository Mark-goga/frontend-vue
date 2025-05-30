import { defineStore } from 'pinia';
import { ref } from 'vue';
import { reviewsApi } from '@/common/api/review';
import { useApiRequest } from '@/common/hooks';
import {
  Film,
  Filter,
  FindManyDocumentsDto,
  PaginationMeta,
  ReviewWithFilm,
  UpdateReviewDto,
  User,
} from '@/common/types-validation';
import { filmsApi } from '@/common/api/films';

export const useUserReviewsStore = defineStore('userReviews', () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const reviews = ref<ReviewWithFilm[]>([]);
  const user = ref<User | null>(null);
  const filtersForFilms = ref<Filter[]>([]);
  const personalFilms = ref<Film[]>([]);
  const personalFilmsPaginationMeta = ref<PaginationMeta | null>(null);
  const loadingPersonalFilms = ref<boolean>(false);

  const { handleApiRequest } = useApiRequest(loading, error);
  const { handleApiRequest: handleApiRequestFilms } = useApiRequest(loadingPersonalFilms, error);

  const fetchUserReviews = async (userId: string) => {
    await handleApiRequest(
      () => reviewsApi.findByUser(userId),
      (data) => {
        reviews.value = data.reviews;
        user.value = data.user;
      }
    );
  };

  const getPersonalFilterForFilms = async (userId: string) => {
    await handleApiRequestFilms(
      () => reviewsApi.getPersonalFilterForFilms(userId),
      (data) => {
        filtersForFilms.value = data.filters;
      },
      {
        showToastSuccess: false,
      }
    );
  };

  const fetchPersonalFilms = async (options: FindManyDocumentsDto) => {
    await handleApiRequestFilms(
      () => filmsApi.findAll(options),
      (data) => {
        personalFilms.value = data.films;
        personalFilmsPaginationMeta.value = data.pagination;
      },
      {
        showToastSuccess: false,
        showToastError: true,
      }
    );
  };

  const editReview = async (reviewId: string, data: UpdateReviewDto) => {
    await handleApiRequest(
      () => reviewsApi.update(reviewId, data),
      (updatedReview) => {
        const index = reviews.value.findIndex((review) => review.id === updatedReview.id);
        if (index !== -1) {
          reviews.value[index] = { ...reviews.value[index], ...updatedReview };
        }
      },
      {
        showToastSuccess: true,
        showToastError: true,
      }
    );
  };

  const deleteReview = async (reviewId: string) => {
    await handleApiRequest(
      () => reviewsApi.remove(reviewId),
      () => {
        reviews.value = reviews.value.filter((review) => review.id !== reviewId);
      },
      {
        showToastSuccess: true,
        showToastError: true,
      }
    );
  };

  return {
    loading,
    error,
    reviews,
    user,
    filtersForFilms,
    personalFilms,
    personalFilmsPaginationMeta,
    fetchUserReviews,
    fetchPersonalFilms,
    getPersonalFilterForFilms,
    editReview,
    deleteReview,
  };
});
