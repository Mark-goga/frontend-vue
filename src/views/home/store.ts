import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Film, filmsApi } from '@/common/api/films';
import { useApiRequest } from '@/common/hooks';

export const useHomeStore = defineStore('home', () => {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const films = ref<Film[]>([]);

  const { handleApiRequest } = useApiRequest(loading, error);

  const fetchFilms = async () => {
    await handleApiRequest(
      () => filmsApi.findAll({ pagination: { page: 1, limit: 20 } }),
      (data) => {
        films.value = data.films;
      },
      {
        showToastSuccess: false,
        showToastError: true,
      }
    );
  };

  return {
    loading,
    error,
    films,
    fetchFilms,
  };
});
