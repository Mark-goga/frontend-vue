<script lang="ts" setup>
import { getUserColor, getUserInitials } from '@/common/utils';

defineProps<{
  name: string;
}>();
</script>

<template>
  <div class="user-avatar" :style="`background-color: ${getUserColor()}`">
    {{ getUserInitials(name) }}
  </div>
</template>

<style scoped>
.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
  flex-shrink: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}
</style>
