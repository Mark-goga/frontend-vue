<script setup lang="ts">
import InputField from '@/common/components/form/inputField.vue';
import { initialValues } from '@/views/auth/register/constants';
import AuthForm from '@/views/auth/components/AuthForm.vue';

const nameRule = 'required';
const onSubmit = (values: any) => {
  console.log('Form submitted:', values);
};
</script>

<template>
  <AuthForm :on-submit="onSubmit" :initial-values="initialValues" submit-text="Register">
    <template #extraFields>
      <InputField label="Name" name="name" :rules="nameRule" placeholder="Enter your name" />
    </template>
  </AuthForm>
</template>
