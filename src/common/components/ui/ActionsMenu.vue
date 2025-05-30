<script lang="ts" setup>
import { defineEmits, defineProps, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
  actions: Array<{
    label: string;
    action: (item: any) => void;
  }>;
  currentItem: any;
  position?: 'right' | 'left';
}>();

const emit = defineEmits<{
  (e: 'menu-opened'): void;
  (e: 'menu-closed'): void;
}>();

const isOpen = ref(false);

const toggleMenu = (event: Event) => {
  event.stopPropagation();
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    emit('menu-opened');
  } else {
    emit('menu-closed');
  }
};

const handleClickOutside = (event: Event) => {
  if (isOpen.value && !(event.target as Element).closest('.actions-menu-container')) {
    isOpen.value = false;
    emit('menu-closed');
  }
};

const handleAction = (action: (item: any) => void) => {
  action(props.currentItem);
  isOpen.value = false;
  emit('menu-closed');
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="actions-menu-container relative">
    <button
      @click.stop="toggleMenu"
      class="p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
      aria-label="Actions menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-400 hover:text-blue-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
        />
      </svg>
    </button>

    <div
      v-if="isOpen"
      :class="[
        'actions-dropdown absolute mt-2 w-48 rounded-md shadow-lg z-10 animate-fadeIn',
        position === 'left' ? 'left-0' : 'right-0',
      ]"
    >
      <ul class="py-1 bg-background-elevated border border-border-light rounded-md">
        <li
          v-for="(action, index) in actions"
          :key="index"
          @click.stop="handleAction(action.action)"
          class="px-4 py-2 text-text-DEFAULT hover:bg-gray-700 cursor-pointer transition-colors duration-200"
        >
          {{ action.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.actions-dropdown {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}
</style>
