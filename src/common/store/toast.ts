import { defineStore } from 'pinia';
import { ref } from 'vue';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  timeout?: number;
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([]);

  function addToast(message: string, type: ToastType = 'info', timeout = 3000): string {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: Toast = { id, message, type, timeout };
    toasts.value.push(toast);

    if (timeout) {
      setTimeout(() => {
        removeToast(id);
      }, timeout);
    }

    return id;
  }

  function success(message: string, timeout?: number) {
    return addToast(message, 'success', timeout);
  }

  function error(message: string, timeout?: number) {
    return addToast(message, 'error', timeout);
  }

  function info(message: string, timeout?: number) {
    return addToast(message, 'info', timeout);
  }

  function warning(message: string, timeout?: number) {
    return addToast(message, 'warning', timeout);
  }

  function removeToast(id: string) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }

  function clearToasts() {
    toasts.value = [];
  }

  return {
    toasts,
    addToast,
    success,
    error,
    info,
    warning,
    removeToast,
    clearToasts,
  };
});
