<script lang="ts" setup>
import CardWrapper from '@/common/components/ui/CardWrapper.vue';
import UserAvatar from '@/common/components/ui/UserAvatar.vue';
import { useUserReviewsStore } from '@/views/user/pages/user-reviews/store';
import { storeToRefs } from 'pinia';

const store = useUserReviewsStore();
const { user, reviews } = storeToRefs(store);
</script>

<template>
  <CardWrapper class="mb-8 p-6 shadow-lg border border-gray-800">
    <div class="flex items-center gap-4">
      <UserAvatar :name="user.name" size="lg" />
      <div>
        <h1 class="text-2xl font-bold text-gray-100">{{ user.name }}</h1>
        <p class="text-gray-400">{{ reviews.length }} відгуків</p>
      </div>
    </div>
  </CardWrapper>
</template>
