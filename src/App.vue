<script setup lang="ts">
import CustomLink from '@/common/components/ui/CustomLink.vue';
import { ROUTES } from '@/common/constants/routes';
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background-light text-text">
    <header
      class="bg-primary-600 text-white py-4 shadow-sm shadow-primary-300 w-[94%] rounded-lg self-center mt-4"
    >
      <div class="container mx-auto flex justify-between items-center px-4">
        <h1 class="text-lg font-bold">My Website</h1>
        <nav class="flex space-x-4">
          <CustomLink :to="ROUTES.HOME"> Home </CustomLink>
          <CustomLink :to="ROUTES.AUTH.REGISTER"> Register </CustomLink>
          <CustomLink :to="ROUTES.AUTH.LOGIN"> Login </CustomLink>
        </nav>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
      <RouterView />
    </main>

    <footer class="bg-background-dark text-text-muted py-4">
      <div class="container mx-auto text-center">
        <p>&copy; 2025 My Website. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style>
body {
  background-color: #14141f;
}
</style>
