<script lang="ts" setup>
import { ArrowPathIcon } from '@heroicons/vue/24/solid';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset';
    text?: string;
    variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost' | 'minimal' | 'outline';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    disabled?: boolean;
    loading?: boolean;
    class?: string;
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    disabled: false,
    loading: false,
    class: '',
  }
);

const variantConfig = {
  primary: {
    classes: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500/50',
  },
  secondary: {
    classes: 'bg-background-elevated text-text hover:bg-background-light focus:ring-primary-600/30',
  },
  accent: {
    classes: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500/30',
  },
  danger: {
    classes: 'bg-status-error text-white hover:bg-red-700 focus:ring-status-error/30',
  },
  ghost: {
    classes: 'bg-transparent text-text hover:bg-background-card focus:ring-primary-600/20',
  },
  minimal: {
    classes:
      'bg-transparent text-text-muted hover:text-text hover:bg-background-light/50 focus:ring-0',
  },
  outline: {
    classes:
      'bg-transparent border-2 border-border-light text-text hover:border-primary-600 hover:text-primary-600 focus:ring-primary-600/20',
  },
};

const sizeConfig = {
  xs: 'px-2 py-1 text-xs rounded',
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 rounded-lg',
  lg: 'px-6 py-3 text-lg rounded-lg',
};

const getClasses = () => {
  const variantClasses = variantConfig[props.variant].classes;
  const sizeClasses = sizeConfig[props.size];
  const widthClass = props.fullWidth ? 'w-full' : '';

  const baseClasses =
    'inline-flex items-center justify-center font-medium shadow transition-colors duration-200 focus:outline-none focus:ring-2';

  const stateClasses = props.disabled ? 'opacity-60 cursor-not-allowed' : '';

  const loadingClasses = props.loading ? 'relative' : '';

  return [
    baseClasses,
    variantClasses,
    sizeClasses,
    widthClass,
    stateClasses,
    loadingClasses,
    props.class,
  ]
    .filter(Boolean)
    .join(' ');
};

const getLoaderSize = () => {
  const sizes = {
    xs: 'h-3.5 w-3.5',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };
  return sizes[props.size];
};
</script>

<template>
  <button v-bind="$attrs" :type="type" :disabled="disabled || loading" :class="getClasses()">
    <div class="relative inline-flex items-center justify-center">
      <span :class="{ 'opacity-0': loading }">
        <slot>{{ text || 'Button' }}</slot>
      </span>
      <span
        v-if="loading"
        class="absolute inset-0 flex items-center justify-center"
        :style="{ color: 'white' }"
      >
        <ArrowPathIcon :class="['animate-spin', getLoaderSize()]" />
      </span>
    </div>
  </button>
</template>
