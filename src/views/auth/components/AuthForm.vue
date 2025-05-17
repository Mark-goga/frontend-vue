<script lang="ts" setup>
import InputField from '@/common/components/form/inputField.vue';
import CustomButton from '@/common/components/ui/CustomButton.vue';
import { Form } from 'vee-validate';

defineProps<{
  onSubmit: (values: any) => void;
  submitText: string;
  loading?: boolean;
  initialValues: Record<string, any>;
}>();

const emailRule = 'required|email';
const passwordRule = 'required|min:6';
</script>

<template>
  <Form
    @submit="onSubmit"
    :initial-values="initialValues"
    class="bg-primary-300 w-full max-w-md mx-auto p-6 rounded-xl"
  >
    <InputField label="Email" type="email" name="email" :rules="emailRule" placeholder="Email" />

    <InputField
      label="Password"
      type="password"
      name="password"
      :rules="passwordRule"
      placeholder="Password"
    />
    <slot name="extraFields" />

    <CustomButton type="submit" :text="submitText" :loading="loading" />
  </Form>
</template>
