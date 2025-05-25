import { defineStore } from 'pinia';
import { ref } from 'vue';
import { CreateReviewDto } from '@/common/types-validation';
import { useApiRequest } from '@/common/hooks';
import { reviewsApi } from '@/common/api/review';

export const useCreateReview = defineStore('createReview', () => {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const { handleApiRequest } = useApiRequest(loading, error);

  const createReview = async (reviewData: CreateReviewDto) => {
    await handleApiRequest(
      () => reviewsApi.create(reviewData),
      () => {
        return;
      },
      {
        showToastSuccess: true,
      }
    );
  };

  return {
    loading,
    error,
    createReview,
  };
});
