<script setup lang="ts">
import { ROUTES } from '@/common/constants/routes';
import { useUserStore } from '@/common/store';
import CustomText from '@/common/components/ui/CustomText.vue';

const userStore = useUserStore();
</script>

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <CustomText :text="userStore.user?.name" variant="title" />
    <router-link :to="ROUTES.AUTH.REGISTER">register</router-link>
    <router-link :to="ROUTES.AUTH.LOGIN">login</router-link>
  </div>
</template>
