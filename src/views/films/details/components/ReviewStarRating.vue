<script lang="ts" setup>
import { computed } from 'vue';
import { StarIcon as StarOutline } from '@heroicons/vue/24/outline';
import { StarIcon as StarSolid } from '@heroicons/vue/24/solid';

const props = defineProps<{
  value: number;
  totalStars?: number;
}>();

const emit = defineEmits<{
  (e: 'update:value', value: number): void;
}>();

const stars = computed(() => {
  return Array.from({ length: props.totalStars || 10 }, (_, i) => i + 1);
});

const handleStarClick = (value: number) => {
  emit('update:value', value);
};

const getStarColor = (starValue: number) => {
  if (starValue <= props.value) {
    if (props.value <= 3) return 'text-red-500';
    if (props.value <= 6) return 'text-yellow-500';
    return 'text-green-500';
  }
  return 'text-gray-400';
};

const getStarSizeClass = (starValue: number, hovered = false) => {
  const baseSize = 'w-8 h-8';
  if (starValue <= props.value) {
    return `${baseSize} ${hovered ? 'scale-125' : 'scale-110'} transition-transform`;
  }
  return baseSize;
};

const getRatingText = computed(() => {
  if (props.value <= 2) return 'Жахливо';
  if (props.value <= 4) return 'Погано';
  if (props.value <= 6) return 'Нормально';
  if (props.value <= 8) return 'Добре';
  return 'Дуже добре';
});

const getRatingTextColor = computed(() => {
  if (props.value <= 3) return 'text-red-500';
  if (props.value <= 6) return 'text-yellow-500';
  return 'text-green-500';
});
</script>

<template>
  <div class="rating-component">
    <div class="flex items-center mb-2">
      <div class="flex space-x-1">
        <button
          v-for="star in stars"
          :key="star"
          @click="handleStarClick(star)"
          class="focus:outline-none transition-all duration-200 hover:scale-125"
          type="button"
        >
          <StarSolid v-if="star <= value" :class="[getStarColor(star), getStarSizeClass(star)]" />
          <StarOutline v-else class="w-8 h-8 text-gray-400" />
        </button>
      </div>
    </div>
    <div class="flex items-center justify-between mt-2">
      <span :class="['font-medium text-lg', getRatingTextColor]">{{ getRatingText }}</span>
      <span class="text-lg font-bold text-text-bright">{{ value }} / {{ totalStars || 10 }}</span>
    </div>
    <div class="w-full bg-gray-700 rounded-full h-2 mt-2">
      <div
        class="h-2 rounded-full transition-all duration-300"
        :class="[
          getRatingTextColor,
          {
            'bg-red-500': value <= 3,
            'bg-yellow-500': value > 3 && value <= 6,
            'bg-green-500': value > 6,
          },
        ]"
        :style="{ width: `${(value / (totalStars || 10)) * 100}%` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.rating-component {
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: rgba(30, 30, 30, 0.5);
  border: 1px solid rgba(75, 75, 75, 0.5);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  margin: 1rem 0;
}
</style>
