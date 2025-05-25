<script setup lang="ts">
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { onMounted } from 'vue';
import StarList from '@/common/components/ui/StarList.vue';
import ListOfText from '@/common/components/ui/ListOfText.vue';
import CustomText from '@/common/components/ui/CustomText.vue';
import { useHomeStore } from '@/views/home/store';
import { storeToRefs } from 'pinia';
import CustomLoader from '@/common/components/ui/CustomLoader.vue';
import { useRouter } from 'vue-router';
import FilmNotFound from '@/views/films/components/FilmNotFound.vue';

const router = useRouter();
const store = useHomeStore();
const { films, loading, error } = storeToRefs(store);
const { fetchFilms } = store;

const handleFilmClick = (filmId: string) => {
  router.push(`/films/${filmId}`);
};

onMounted(async () => {
  await fetchFilms();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-text-bright">Огляд фільмів</h1>
    <CustomLoader v-if="loading" />
    <FilmNotFound v-if="films.length === 0" />

    <div v-else class="relative">
      <Swiper
        :modules="[Pagination, Autoplay, EffectCoverflow]"
        :slides-per-view="1"
        :breakpoints="{
          '640': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '1024': {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }"
        :space-between="30"
        :pagination="{ clickable: true }"
        :effect="'coverflow'"
        :grabCursor="true"
        :centeredSlides="true"
        :autoplay="{ delay: 3500, disableOnInteraction: false }"
        :coverflowEffect="{
          rotate: 10,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }"
        class="mySwiper"
      >
        <SwiperSlide v-for="film in films" :key="film.id" class="pb-12">
          <div
            class="bg-background-card rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl film-card cursor-pointer"
            @click="handleFilmClick(film.id)"
          >
            <div class="relative">
              <img
                :src="film.avatarImageKey || 'https://via.placeholder.com/400x600?text=No+Image'"
                alt="Film Poster"
                class="w-full h-80 object-cover"
                loading="lazy"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-70"
              ></div>
            </div>

            <div class="p-6">
              <CustomText variant="body" class="text-xl font-bold truncate"
                >{{ film.title }}
              </CustomText>
              <div @onclick="() => console.log(film)"></div>
              <StarList class="mb-3" :rating="film.estimation || 0" />
              <p v-if="film.director" class="text-text-muted text-sm mb-1">
                <span class="font-semibold">Режисер:</span> {{ film.director }}
              </p>
              <ListOfText class="mt-3" :texts="film.genre || []" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style scoped>
.film-card {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  border: 1px solid #1e1e2e;
}

.film-card:hover {
  border-color: #af6bff;
  box-shadow: 0 15px 25px rgba(100, 41, 163, 0.4);
}

:deep(.swiper-pagination-bullet) {
  background-color: #3cb760;
  width: 10px;
  height: 10px;
  opacity: 0.5;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #af6bff;
  opacity: 1;
}

:deep(.swiper-pagination) {
  bottom: 0 !important;
}

@media (max-width: 640px) {
  :deep(.swiper-slide) {
    padding-bottom: 40px;
  }
}
</style>
