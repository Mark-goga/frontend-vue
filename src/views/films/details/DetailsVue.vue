<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CustomLoader from '@/common/components/ui/CustomLoader.vue';
import ErrorText from '@/common/components/ui/ErrorText.vue';
import FilmNotFound from '@/views/films/components/FilmNotFound.vue';
import { useFilmDetailsStore } from '@/views/films/details/store';
import { storeToRefs } from 'pinia';
import InformationAboutFilm from '@/common/components/film/informationAboutFilm.vue';
import FilmReviews from '@/views/films/details/components/FilmReviews.vue';

const route = useRoute();
const filmId = route.params.filmId as string;

const store = useFilmDetailsStore();
const { film, loading, error, reviews } = storeToRefs(store);
const { fetchFilmDetails } = store;

onMounted(async () => {
  await fetchFilmDetails(filmId);
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <CustomLoader v-if="loading" />
    <ErrorText :error="error" />
    <FilmNotFound v-if="!film" />

    <template v-if="film">
      <InformationAboutFilm :film="film" />
      <div class="my-10 border-t border-gray-700 opacity-30"></div>
      <FilmReviews :reviews="reviews" />
    </template>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
