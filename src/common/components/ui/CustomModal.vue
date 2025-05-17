<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import CustomText from './CustomText.vue';

const props = withDefaults(
  defineProps<{
    title?: string;
    isOpen: boolean;
    closeOnClickOutside?: boolean;
    widthClass?: string;
  }>(),
  {
    title: '',
    closeOnClickOutside: true,
    widthClass: 'max-w-lg',
  }
);

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const modalRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (
    props.closeOnClickOutside &&
    props.isOpen &&
    modalRef.value &&
    !modalRef.value.contains(event.target as Node)
  ) {
    emit('close');
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (props.isOpen && event.key === 'Escape') {
    emit('close');
  }
};

const lockScroll = () => {
  document.body.style.overflow = 'hidden';
};

const unlockScroll = () => {
  document.body.style.overflow = '';
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
  document.addEventListener('keydown', handleKeyDown);

  if (props.isOpen) {
    lockScroll();
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
  document.removeEventListener('keydown', handleKeyDown);
  unlockScroll();
});

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }
);
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isOpen"
            ref="modalRef"
            :class="['bg-background-card shadow-xl rounded-xl overflow-hidden w-full', widthClass]"
          >
            <div class="flex items-center justify-between px-6 py-4 border-b border-border-light">
              <CustomText v-if="title" variant="subtitle" :text="title" />
              <button
                type="button"
                class="p-1 text-text-muted hover:text-text rounded-full hover:bg-background-elevated transition-colors focus:outline-none"
                @click="emit('close')"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>

            <div class="p-6">
              <slot></slot>
            </div>

            <div v-if="$slots.footer" class="px-6 py-4 border-t border-border-light">
              <slot name="footer"></slot>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>
