<script lang="ts" setup>
type CustomInputProps = {
  name: string;
  type: string;
  placeholder?: string;
  disabled?: boolean;
  variant?: 'default' | 'outlined' | 'dark' | 'accent' | 'minimal';
  underlined?: boolean;
  class?: string;
  value?: string | number;
  autocomplete?: string;
};

const props = withDefaults(defineProps<CustomInputProps>(), {
  name: '',
  type: 'text',
  disabled: false,
  variant: 'default',
  underlined: false,
  class: '',
  autocomplete: 'off',
});

const variantConfig = {
  default: {
    classes:
      'w-full px-4 py-3 rounded-lg shadow-sm border-2 border-primary-200 bg-white text-gray-800 placeholder:text-gray-400 hover:border-primary-400 focus:border-primary-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:shadow-md',
  },
  outlined: {
    classes:
      'w-full px-4 py-3 rounded-lg border-2 border-border-light bg-transparent text-text placeholder:text-text-dark hover:border-primary-600 focus:border-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600/30',
  },
  dark: {
    classes:
      'w-full px-4 py-3 rounded-lg border-2 border-background-elevated bg-background-card text-text placeholder:text-text-dark hover:border-primary-600 focus:border-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600/30',
  },
  accent: {
    classes:
      'w-full px-4 py-3 rounded-lg border-2 border-accent-200 bg-transparent text-text placeholder:text-text-dark hover:border-accent-500 focus:border-accent-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500/30',
  },
  minimal: {
    classes:
      'w-full px-3 py-2 rounded-md border border-transparent bg-background-elevated text-text placeholder:text-text-dark hover:bg-background-light focus:border-primary-600 transition-colors duration-200 focus:outline-none',
  },
};

const underlinedConfig = {
  default: {
    classes:
      'w-full px-4 py-3 border-0 border-b-2 border-primary-200 bg-white text-gray-800 placeholder:text-gray-400 hover:border-b-primary-400 focus:border-b-primary-500 transition-colors duration-200 focus:outline-none',
  },
  outlined: {
    classes:
      'w-full px-4 py-3 border-0 border-b-2 border-border-light bg-transparent text-text placeholder:text-text-dark hover:border-b-primary-600 focus:border-b-primary-600 transition-colors duration-200 focus:outline-none',
  },
  dark: {
    classes:
      'w-full px-4 py-3 border-0 border-b-2 border-background-elevated bg-background-card text-text placeholder:text-text-dark hover:border-b-primary-600 focus:border-b-primary-600 transition-colors duration-200 focus:outline-none',
  },
  accent: {
    classes:
      'w-full px-4 py-3 border-0 border-b-2 border-accent-200 bg-transparent text-text placeholder:text-text-dark hover:border-b-accent-500 focus:border-b-accent-500 transition-colors duration-200 focus:outline-none',
  },
  minimal: {
    classes:
      'w-full px-3 py-2 border-0 border-b border-background-elevated bg-transparent text-text placeholder:text-text-dark hover:border-b-primary-600 focus:border-b-primary-600 transition-colors duration-200 focus:outline-none',
  },
};

const getClasses = () => {
  const config = props.underlined ? underlinedConfig : variantConfig;

  let classes = props.disabled
    ? config[props.variant].classes.replace(/hover:[^ ]*/g, '') + ' opacity-60 cursor-not-allowed'
    : config[props.variant].classes;

  return [classes, props.class].filter(Boolean).join(' ');
};
</script>

<template>
  <input
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="value"
    :autocomplete="autocomplete"
    :class="getClasses()"
    @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
  />
</template>
