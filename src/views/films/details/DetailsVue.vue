<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CustomLoader from '@/common/components/ui/CustomLoader.vue';
import ErrorText from '@/common/components/ui/ErrorText.vue';
import FilmNotFound from '@/views/films/components/FilmNotFound.vue';
import { useFilmDetailsStore } from '@/views/films/details/store';
import { storeToRefs } from 'pinia';
import InformationAboutFilm from '@/common/components/film/informationAboutFilm.vue';

const route = useRoute();
const filmId = route.params.filmId as string;

const store = useFilmDetailsStore();
const { film, loading, error } = storeToRefs(store);
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
    <InformationAboutFilm v-if="film" :film="film" />
  </div>
</template>
