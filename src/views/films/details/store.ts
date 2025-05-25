import { defineStore } from 'pinia';
import { ref } from 'vue';
import { filmsApi } from '@/common/api/films';
import { useApiRequest } from '@/common/hooks';
import { Film, ReviewWithUser } from '@/common/types-validation';

export const useFilmDetailsStore = defineStore('details_film', () => {
  const film = ref<Film | null>(null);
  const reviews = ref<ReviewWithUser[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const { handleApiRequest } = useApiRequest(loading, error);

  const fetchFilmDetails = async (id: string) => {
    await handleApiRequest(
      () => filmsApi.findOne(id),
      (data) => {
        film.value = data.film;
        reviews.value = data.reviews;
      },
      {
        showToastSuccess: false,
      }
    );
  };

  return {
    film,
    loading,
    error,
    fetchFilmDetails,
    reviews,
  };
});
