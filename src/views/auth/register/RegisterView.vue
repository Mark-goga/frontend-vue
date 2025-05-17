<script setup lang="ts">
import { Form } from 'vee-validate';
import InputField from '@/common/components/form/inputField.vue';
import CustomButton from '@/common/components/ui/CustomButton.vue';

const passwordRule = 'required|min:8';
const emailRule = 'email|required';

const onSubmit = (values: any) => {
  console.log('Form submitted:', values);
};
</script>

<template>
  <Form @submit.prevent="onSubmit" class="bg-primary-300 w-full max-w-md mx-auto p-6 rounded-xl">
    <InputField label="Email" type="email" name="email" :rules="emailRule" placeholder="Email" />

    <InputField
      label="Password"
      type="password"
      name="password"
      :rules="passwordRule"
      placeholder="Password"
    />

    <CustomButton type="submit" text="Register" loading />
  </Form>
</template>
