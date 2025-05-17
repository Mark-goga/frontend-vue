<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    text?: string;
    variant: 'title' | 'subtitle' | 'heading' | 'body' | 'caption' | 'primary';
    class?: string;
    withMargin?: boolean;
  }>(),
  {
    variant: 'body',
    class: '',
    withMargin: false,
  }
);

const variantConfig = {
  title: {
    tag: 'h1',
    classes: 'text-4xl font-bold text-text-bright leading-tight',
  },
  subtitle: {
    tag: 'h2',
    classes: 'text-2xl font-semibold text-text leading-snug',
  },
  heading: {
    tag: 'h3',
    classes: 'text-xl font-medium text-accent-500 leading-normal',
  },
  body: {
    tag: 'p',
    classes: 'text-base text-text font-normal leading-relaxed',
  },
  caption: {
    tag: 'p',
    classes: 'text-sm text-text-muted font-normal leading-normal',
  },
  primary: {
    tag: 'p',
    classes: 'text-base text-primary-900 leading-relaxed font-bold',
  },
};

const getTag = () => variantConfig[props.variant].tag;

const getClasses = () => {
  return [variantConfig[props.variant].classes, props.withMargin ? 'mb-4' : '', props.class].join(
    ' '
  );
};
</script>

<template>
  <component :is="getTag()" :class="getClasses()">
    <slot>{{ text }}</slot>
  </component>
</template>
