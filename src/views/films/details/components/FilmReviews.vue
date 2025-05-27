<script lang="ts" setup>
import { ReviewWithUser } from '@/common/types-validation';
import { formatDate } from '@/common/utils';
import CardWrapper from '@/common/components/ui/CardWrapper.vue';
import UserAvatar from '@/common/components/ui/UserAvatar.vue';
import StarWithRating from '@/common/components/film/StarWithRating.vue';
import { useRouter } from 'vue-router';
import { ROUTES } from '@/common/constants/routes';

defineProps<{
  reviews: ReviewWithUser[];
}>();

const router = useRouter();
const handleUserClick = (userId: string) => {
  router.push(`${ROUTES.USER.REVIEWS}/${userId}`);
};
</script>

<template>
  <div class="my-12">
    <h2 class="text-2xl font-bold mb-6 text-text-bright">Коментарі та відгуки</h2>

    <div v-if="reviews.length === 0" class="text-center py-10">
      <div class="text-5xl mb-4">💬</div>
      <p class="text-text-muted">
        Цей фільм ще не має відгуків. Будьте першим, хто залишить свою думку!
      </p>
    </div>

    <div v-else class="space-y-6">
      <div v-for="review in reviews" :key="review.id">
        <CardWrapper>
          <div class="flex gap-4 items-center">
            <UserAvatar :name="review.user.name" @click="handleUserClick(review.userId)" />

            <div class="flex-1">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-xl font-semibold text-text-bright">{{ review.title }}</h3>
                  <div class="text-text-muted flex items-center gap-2">
                    <span>{{ review.user.name || 'Користувач' }}</span>
                    <span class="text-xs">•</span>
                    <span class="text-sm">{{ formatDate(review.createdAt) }}</span>
                  </div>
                </div>
                <StarWithRating :rating="review.rating" />
              </div>

              <div class="mt-3 text-text-regular">
                <p>{{ review.description }}</p>
              </div>
            </div>
          </div>
        </CardWrapper>
      </div>
    </div>
  </div>
</template>
