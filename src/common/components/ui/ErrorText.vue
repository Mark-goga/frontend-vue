<script lang="ts" setup>
import CustomText from '@/common/components/ui/CustomText.vue';

defineProps<{
  error?: string | null;
}>();
</script>

<template>
  <div v-if="error" class="bg-status-error/10 text-status-error p-4 rounded-lg">
    <CustomText>{{ error }}</CustomText>
  </div>
</template>
