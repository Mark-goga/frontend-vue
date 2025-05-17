<script setup lang="ts">
defineProps<{
  to: string;
  customClass?: string;
}>();
</script>

<template>
  <RouterLink
    :to="to"
    :class="['hover:text-primary-300 transition-colors', customClass]"
    active-class="text-primary-300"
  >
    <slot />
  </RouterLink>
</template>
