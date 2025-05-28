<script lang="ts" setup>
import SecondarySwiperForFilm from '@/common/components/film/SecondarySwiperForFilm.vue';
import { useUserReviewsStore } from '@/views/user/pages/user-reviews/store';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Film } from '@/common/types-validation';
import CustomText from '@/common/components/ui/CustomText.vue';
import CustomButton from '@/common/components/ui/CustomButton.vue';

const route = useRoute();
const router = useRouter();
const userId = route.params.userId as string;
const store = useUserReviewsStore();
const { filtersForFilms, personalFilms, user, personalFilmsPaginationMeta } = storeToRefs(store);
const { fetchPersonalFilms, getPersonalFilterForFilms } = store;
const pagination = reactive({
  page: 1,
  limit: 20,
});

const loadMoreFilms = async () => {
  pagination.page += 1;
  if (personalFilmsPaginationMeta?.value?.hasNext)
    await fetchPersonalFilms({
      pagination,
      filters: filtersForFilms.value,
    });
};

const navigateToFilm = (film: Film) => {
  router.push(`/films/${film.id}`);
};

onMounted(async () => {
  await getPersonalFilterForFilms(userId);
  await fetchPersonalFilms({
    pagination,
    filters: filtersForFilms.value,
  });
});
</script>

<template>
  <div v-if="personalFilms.length > 0">
    <SecondarySwiperForFilm
      class="mt-8"
      :films="personalFilms"
      :handleFilmClick="navigateToFilm"
      :title="'Схожі фільми для користувача ' + user?.name"
    />
    <div v-if="personalFilmsPaginationMeta?.hasNext">
      <CustomText variant="subtitle">Показати більше фільмів</CustomText>
      <CustomButton :onclick="loadMoreFilms">Ще</CustomButton>
    </div>
    <div v-else>
      <CustomText variant="subtitle">У нас для вас не залишолося більше фільмів</CustomText>
    </div>
  </div>
</template>
