<script lang="ts" setup>
import StarList from '@/common/components/ui/StarList.vue';

const props = defineProps<{
  rating: number;
  class?: string;
}>();

const defaultClass = 'flex items-center mb-4 justify-center';
const getClasses = () => {
  return [defaultClass, props.class].join(' ');
};
</script>

<template>
  <div :class="getClasses()">
    <StarList class="mb-0!" :rating="rating" />
    <span class="ml-2 text-text-muted">{{ rating?.toFixed(1) || 'N/A' }}/10</span>
  </div>
</template>
