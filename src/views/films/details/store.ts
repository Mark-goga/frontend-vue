import { defineStore } from 'pinia';
import { ref } from 'vue';
import { filmsApi } from '@/common/api/films';
import { useApiRequest } from '@/common/hooks';
import { Film, ReviewWithUser } from '@/common/types-validation';

export const useFilmDetailsStore = defineStore('details_film', () => {
  const film = ref<Film | null>(null);
  const similarFilmsByGenre = ref<Film[]>([]);
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

  const fetchSimilarFilmsByGenre = async (genre: string[]) => {
    await handleApiRequest(
      () =>
        filmsApi.findAll({
          pagination: { page: 1, limit: 10 },
          filters: [{ field: 'genre', value: genre.join(',') }],
        }),
      (data) => {
        similarFilmsByGenre.value = data.films;
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
    similarFilmsByGenre,
    fetchSimilarFilmsByGenre,
  };
});
