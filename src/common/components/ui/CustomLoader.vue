<script lang="ts" setup>
withDefaults(
  defineProps<{
    loading?: boolean;
  }>(),
  {
    loading: true,
  }
);
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
  </div>
</template>
