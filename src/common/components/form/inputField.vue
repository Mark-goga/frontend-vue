<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate';
import CustomInput from '@/common/components/ui/CustomInput.vue';

defineOptions({
  inheritAttrs: false,
});

withDefaults(
  defineProps<{
    name: string;
    label: string;
    type: string;
    rules: string;
  }>(),
  {
    name: '',
    label: '',
    type: 'text',
    rules: '',
  }
);
</script>

<template>
  <div class="flex flex-col mb-4 w-full">
    <label :for="name" class="text-primary-900 mb-1.5 font-semibold text-sm">{{ label }}</label>
    <Field :name="name" :type="type" :rules="rules" :id="name" v-slot="{ field }">
      <CustomInput
        variant="default"
        :placeholder="placeholder"
        v-bind="{ ...field, ...$attrs }"
        :type="type"
      />
    </Field>
    <ErrorMessage :name="name" class="text-status-error text-sm mt-1.5 font-medium absolute" />
  </div>
</template>
