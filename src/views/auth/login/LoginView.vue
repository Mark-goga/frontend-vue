<script lang="ts" setup>
import { initialValues } from '@/views/auth/login/constants';
import AuthForm from '@/views/auth/components/AuthForm.vue';
import { authApi } from '@/views/auth/api/auth';
import { ref } from 'vue';

const loading = ref(false);
const error = ref<string | null>(null);

const onSubmit = async (values: any) => {
  try {
    loading.value = true;
    error.value = null;
    await authApi.login(values);
  } catch (err) {
    error.value = 'Login failed. Please check your credentials.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <AuthForm
    :on-submit="onSubmit"
    :initial-values="initialValues"
    submit-text="Login"
    :loading="loading"
  ></AuthForm>
</template>
