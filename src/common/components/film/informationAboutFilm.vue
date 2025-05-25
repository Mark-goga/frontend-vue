<script lang="ts" setup>
import { getStarsFromEstimation } from '@/common/utils/stars';
import ListOfText from '@/common/components/ui/ListOfText.vue';
import StarList from '@/common/components/ui/StarList.vue';
import { Film } from '@/common/types-validation';

defineProps<{
  film: Film;
}>();
</script>

<template>
  <div class="film-details">
    <div class="flex flex-col md:flex-row gap-8 mb-10">
      <div class="w-full md:w-1/3 lg:w-1/4">
        <div class="rounded-xl overflow-hidden shadow-lg film-poster">
          <img
            :src="film.backGroundImageKey || 'https://via.placeholder.com/400x600?text=No+Image'"
            :alt="film.title"
            class="w-full h-auto object-cover"
          />
        </div>
      </div>

      <div class="w-full md:w-2/3 lg:w-3/4">
        <h1 class="text-3xl md:text-4xl font-bold mb-4 text-text-bright">{{ film.title }}</h1>

        <div class="flex items-center justify-center mb-4">
          <StarList class="mb-0" :stars="getStarsFromEstimation(film.estimation || 0)" />
          <span class="ml-2 text-text-muted">{{ film.estimation?.toFixed(1) || 'N/A' }}/10</span>
        </div>

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
            <ListOfText class="mt-0" :texts="film.genre" />
          </div>
        </div>

        <div class="mt-6">
          <h2 class="text-xl font-semibold mb-3 text-text-bright">Опис</h2>
          <p class="text-text-regular">{{ film.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.film-poster {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid #1e1e2e;
}

.film-details {
  animation: fadeIn 0.6s ease-in-out;
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
</style>
