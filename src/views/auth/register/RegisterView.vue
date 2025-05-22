<script setup lang="ts">
import InputField from '@/common/components/form/inputField.vue';
import { initialValues } from '@/views/auth/register/constants';
import AuthForm from '@/views/auth/components/AuthForm.vue';
import { useUserStore } from '@/common/store';

const nameRule = 'required';
const userStore = useUserStore();
const onSubmit = (values: typeof initialValues) => {
  userStore.register(values.name, values.email, values.password);
};
</script>

<template>
  <AuthForm :on-submit="onSubmit" :initial-values="initialValues" submit-text="Register">
    <template #extraFields>
      <InputField label="Name" name="name" :rules="nameRule" placeholder="Enter your name" />
    </template>
  </AuthForm>
</template>
