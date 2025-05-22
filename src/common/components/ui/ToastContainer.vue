<template>
  <div class="toast-container">
    <transition-group name="toast-fade">
      <CustomToast
        v-for="toast in toasts"
        :key="toast.id"
        :id="toast.id"
        :message="toast.message"
        :type="toast.type"
        :position="position"
        @close="removeToast(toast.id)"
      />
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { useToastStore } from '@/common/store';
import { storeToRefs } from 'pinia';
import CustomToast from './CustomToast.vue';

const toastStore = useToastStore();
const { toasts } = storeToRefs(toastStore);
const { removeToast } = toastStore;

defineProps({
  position: {
    type: String,
    default: 'top-right',
  },
});
</script>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}
.toast-fade-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
.toast-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
