<script lang="ts" setup>
defineProps<{
  texts: string[];
}>();
</script>

<template>
  <div v-if="texts.length" class="flex flex-wrap gap-2">
    <span
      v-for="(text, i) in texts"
      :key="i"
      class="px-2 py-1 bg-primary-900 bg-opacity-50 text-primary-100 rounded-md text-xs"
    >
      {{ text }}
    </span>
  </div>
</template>
