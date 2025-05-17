<script lang="ts" setup>
import { initialValues } from '@/views/auth/login/constants';
import AuthForm from '@/views/auth/components/AuthForm.vue';

const onSubmit = (values: any) => {
  console.log('Form submitted:', values);
};
</script>

<template>
  <AuthForm :on-submit="onSubmit" :initial-values="initialValues" submit-text="Login"></AuthForm>
</template>
