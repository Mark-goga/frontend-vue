<script lang="ts" setup></script>

<template>
  <div class="review-card film-reviews">
    <slot />
  </div>
</template>

<style scoped>
.review-card {
  background-color: rgba(30, 30, 46, 0.6);
  border: 1px solid #2d2d3a;
  border-radius: 12px;
  padding: 16px 20px;
  transition: all 0.3s ease;
}

.review-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.film-reviews {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
