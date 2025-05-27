import { defineStore } from 'pinia';
import { ref } from 'vue';
import { reviewsApi } from '@/common/api/review';
import { useApiRequest } from '@/common/hooks';
import { ReviewWithFilm, User } from '@/common/types-validation';

export const useUserReviewsStore = defineStore('userReviews', () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const reviews = ref<ReviewWithFilm[]>([]);
  const user = ref<User | null>(null);

  const { handleApiRequest } = useApiRequest(loading, error);
  const fetchUserReviews = async (userId: string) => {
    await handleApiRequest(
      () => reviewsApi.findByUser(userId),
      (data) => {
        reviews.value = data.reviews;
        user.value = data.user;
      }
    );
  };

  return {
    loading,
    error,
    reviews,
    user,
    fetchUserReviews,
  };
});
