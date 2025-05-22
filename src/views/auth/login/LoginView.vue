<script lang="ts" setup>
import { initialValues } from '@/views/auth/login/constants';
import AuthForm from '@/views/auth/components/AuthForm.vue';
import { useUserStore } from '@/common/store';
import { useRouter } from 'vue-router';
import { ROUTES } from '@/common/constants/routes';

const router = useRouter();
const userStore = useUserStore();

const onSubmit = async (values: any) => {
  await userStore.login(values.email, values.password);
  if (userStore.error) {
    return;
  }
  await router.push(ROUTES.HOME);
};
</script>

<template>
  <AuthForm
    :on-submit="onSubmit"
    :initial-values="initialValues"
    submit-text="Login"
    :loading="userStore.loading"
  ></AuthForm>
</template>
