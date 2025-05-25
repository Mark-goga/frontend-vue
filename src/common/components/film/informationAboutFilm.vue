<script lang="ts" setup>
import ListOfText from '@/common/components/ui/ListOfText.vue';
import { Film } from '@/common/types-validation';
import { computed, ref } from 'vue';
import StarWithRating from '@/common/components/film/StarWithRating.vue';

const props = defineProps<{
  film: Film;
}>();

const imageLoaded = ref(false);
const avatarLoaded = ref(false);

const backgroundImage = computed(
  () => props.film.backGroundImageKey || 'https://via.placeholder.com/1200x600?text=No+Background'
);
const avatarImage = computed(
  () =>
    props.film.avatarImageKey ||
    props.film.backGroundImageKey ||
    'https://via.placeholder.com/400x600?text=No+Image'
);

const handleImageLoad = () => {
  imageLoaded.value = true;
};

const handleAvatarLoad = () => {
  avatarLoaded.value = true;
};
</script>

<template>
  <div class="film-details">
    <div
      class="film-backdrop w-full h-[400px] relative mb-8 overflow-hidden rounded-lg"
      :class="{ 'image-loaded': imageLoaded }"
    >
      <img
        :src="backgroundImage"
        :alt="`${film.title} backdrop`"
        class="w-full h-full object-cover absolute top-0 left-0"
        @load="handleImageLoad"
      />
      <div class="backdrop-overlay absolute top-0 left-0 w-full h-full"></div>
    </div>

    <div class="flex flex-col md:flex-row gap-8 mb-10 relative">
      <div class="w-full md:w-1/3 lg:w-1/4 relative">
        <div
          class="rounded-xl overflow-hidden shadow-xl film-poster transform transition-all duration-300 hover:scale-102"
          :class="{ 'avatar-loaded': avatarLoaded }"
        >
          <img
            :src="avatarImage"
            :alt="film.title"
            class="w-full h-auto object-cover"
            @load="handleAvatarLoad"
          />
          <div class="poster-shine"></div>
        </div>
      </div>

      <div class="w-full md:w-2/3 lg:w-3/4 film-info">
        <h1 class="text-3xl md:text-4xl font-bold mb-4 text-text-bright film-title">
          {{ film.title }}
        </h1>

        <StarWithRating :rating="film.estimation" />

        <div class="mb-6 space-y-3">
          <p v-if="film.director" class="text-text-regular">
            <span class="font-semibold text-text-bright">Режисер:</span> {{ film.director }}
          </p>

          <p v-if="film.releaseDate" class="text-text-regular">
            <span class="font-semibold text-text-bright">Дата виходу:</span>
            {{ new Date(film.releaseDate).toLocaleDateString('uk-UA') }}
          </p>

          <div class="flex flex-wrap gap-2 items-center justify-center">
            <span class="font-semibold text-text-bright mr-2">Жанри:</span>
            <ListOfText class="mt-0!" :texts="film.genre" />
          </div>
        </div>

        <div class="mt-6 film-description">
          <h2 class="text-xl font-semibold mb-3 text-text-bright">Опис</h2>
          <p class="text-text-regular">{{ film.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.film-poster {
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4);
  border: 1px solid #1e1e2e;
  position: relative;
  overflow: hidden;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.avatar-loaded .film-poster {
  opacity: 1;
  transform: translateY(0);
}

.poster-shine {
  position: absolute;
  top: -100%;
  left: -100%;
  width: 50%;
  height: 200%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(25deg);
  animation: shine 4s infinite;
}

@keyframes shine {
  0% {
    top: -100%;
    left: -100%;
  }
  20% {
    top: 100%;
    left: 100%;
  }
  100% {
    top: 100%;
    left: 100%;
  }
}

.film-backdrop {
  transform: translateY(-10px);
  opacity: 0;
  transition: all 0.6s ease-out;
}

.image-loaded {
  opacity: 1;
  transform: translateY(0);
}

.backdrop-overlay {
  background: linear-gradient(to bottom, rgba(18, 18, 24, 0.2) 0%, rgba(18, 18, 24, 0.9) 100%);
}

.film-details {
  animation: fadeIn 0.6s ease-in-out;
}

.film-info {
  animation: slideIn 0.7s ease-out forwards;
}

.film-title {
  position: relative;
  display: inline-block;
}

.film-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #8b5cf6, #6366f1);
  transition: width 0.3s ease;
}

.film-title:hover::after {
  width: 100%;
}

.film-description {
  position: relative;
  transition: all 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scale {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}

.transform {
  transition-property: transform;
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>
