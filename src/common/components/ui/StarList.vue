<script lang="ts" setup>
import FullStar from '@/common/components/ui/svg/fullStar.vue';
import EmptyStar from '@/common/components/ui/svg/emptyStar.vue';
import HalfStar from '@/common/components/ui/svg/halfStar.vue';
import { getStarsFromEstimation } from '@/common/utils/stars';
import { computed } from 'vue';

const props = defineProps<{
  rating: number;
}>();

const stars = computed(() => getStarsFromEstimation(props.rating));
</script>

<template>
  <div class="flex items-center">
    <span v-for="(star, index) in stars" :key="index" class="mr-1">
      <FullStar v-if="star === 'full'" />
      <HalfStar v-if="star === 'half'" />
      <EmptyStar v-if="star === 'empty'" />
    </span>
  </div>
</template>
