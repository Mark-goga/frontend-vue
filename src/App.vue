<script setup lang="ts">
import CustomLink from '@/common/components/ui/CustomLink.vue';
import ToastContainer from '@/common/components/ui/ToastContainer.vue';
import { ROUTES } from '@/common/constants/routes';
import { computed, onMounted } from 'vue';
import { useUserStore } from '@/common/store';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const reviewsRoute = computed(() => {
  return user.value?.id ? `${ROUTES.USER.REVIEWS}/${user.value.id}` : '#';
});

const authenticatedLinks = computed(() => [
  { text: 'Home', route: ROUTES.HOME },
  { text: 'Reviews', route: reviewsRoute.value, disabled: !user.value?.id },
  { text: 'Logout', action: () => userStore.logout() },
  { text: 'Sessions', route: ROUTES.AUTH.SESSIONS },
]);

const unauthenticatedLinks = [
  { text: 'Home', route: ROUTES.HOME },
  { text: 'Register', route: ROUTES.AUTH.REGISTER },
  { text: 'Login', route: ROUTES.AUTH.LOGIN },
];

const navLinks = computed(() => {
  return userStore.isAuthenticated ? authenticatedLinks.value : unauthenticatedLinks;
});

onMounted(() => {
  userStore.refreshToken();
});
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background-light text-text">
    <header
      class="bg-primary-600 text-white py-4 shadow-sm shadow-primary-300 w-[94%] rounded-lg self-center mt-4"
    >
      <div class="container mx-auto flex justify-between items-center px-4">
        <h1 class="text-lg font-bold">Filmmy</h1>
        <nav class="flex space-x-4">
          <template v-for="(link, index) in navLinks" :key="index">
            <CustomLink
              v-if="link.route && link.route !== '#'"
              :to="link.route"
              :class="{ 'opacity-50 cursor-not-allowed': link.disabled }"
            >
              {{ link.text }}
            </CustomLink>
            <a
              v-else-if="link.action"
              href="#"
              @click.prevent="link.action"
              class="text-white hover:text-white/80"
            >
              {{ link.text }}
            </a>
            <span v-else class="text-white opacity-50 cursor-not-allowed">
              {{ link.text }}
            </span>
          </template>
        </nav>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
      <RouterView />
    </main>

    <footer class="bg-background-dark text-text-muted py-4">
      <div class="container mx-auto text-center">
        <p>&copy; 2025 Filmmy. All rights reserved.</p>
      </div>
    </footer>

    <ToastContainer />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: #14141f;
}
</style>
