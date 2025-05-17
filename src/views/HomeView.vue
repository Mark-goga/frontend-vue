<script setup lang="ts">
import { ROUTES } from '@/common/constants/routes';
</script>

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <router-link :to="ROUTES.AUTH.REGISTER">register</router-link>
    <router-link :to="ROUTES.AUTH.LOGIN">login</router-link>
  </div>
</template>
