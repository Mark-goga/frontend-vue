<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import StarList from '@/common/components/ui/StarList.vue';
import ListOfText from '@/common/components/ui/ListOfText.vue';
import { Film } from '@/common/types-validation';

withDefaults(
  defineProps<{
    films: Film[];
    handleFilmClick: (film: Film) => void;
    title?: string;
  }>(),
  {
    title: 'Схожі фільми за жанром',
  }
);
</script>

<template>
  <div v-if="films.length > 0" class="mb-10">
    <h2 class="text-2xl font-bold text-white mb-6">{{ title }}</h2>
    <div class="similar-films-slider">
      <Swiper
        :modules="[FreeMode, Navigation, Autoplay]"
        :slides-per-view="'auto'"
        :space-between="20"
        :navigation="true"
        :free-mode="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }"
        class="similar-films-swiper"
      >
        <SwiperSlide v-for="film in films" :key="film.id" class="similar-film-slide">
          <div class="similar-film-card" @click="handleFilmClick(film)">
            <div class="film-card-image">
              <img
                :src="film.avatarImageKey || 'https://via.placeholder.com/220x330?text=No+Image'"
                alt="Film Poster"
                class="poster-image"
                loading="lazy"
              />
            </div>
            <div class="film-card-content">
              <StarList :rating="film.estimation || 0" class="mb-2" />
              <h3 class="film-title">{{ film.title }}</h3>
              <ListOfText :texts="film.genre || []" class="film-genre" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style scoped>
.similar-films-slider {
  position: relative;
  max-height: 400px;
  margin-bottom: 20px;
}

.similar-films-swiper {
  padding: 10px 5px 20px;
}

.similar-film-slide {
  width: 220px;
  height: 350px;
}

.similar-film-card {
  width: 100%;
  height: 100%;
  background-color: rgba(30, 30, 46, 0.6);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(75, 75, 95, 0.3);
  position: relative;
}

.similar-film-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(175, 107, 255, 0.4);
  border-color: rgba(175, 107, 255, 0.6);
}

.film-card-image {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.similar-film-card:hover .poster-image {
  transform: scale(1.05);
}

.film-card-content {
  padding: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.film-title {
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.film-genre {
  font-size: 12px;
  color: #9ca3af;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #af6bff;
  background-color: rgba(0, 0, 0, 0.5);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 14px;
  font-weight: bold;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background-color: rgba(175, 107, 255, 0.3);
}

:deep(.swiper-button-disabled) {
  opacity: 0.3;
}
</style>
