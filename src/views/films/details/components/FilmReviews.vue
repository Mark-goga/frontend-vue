<script lang="ts" setup>
import { ReviewWithUser } from '@/common/types-validation';
import StarList from '@/common/components/ui/StarList.vue';
import { getStarsFromEstimation } from '@/common/utils/stars';
import { formatDate } from '@/common/utils';
import CardWrapper from '@/common/components/ui/CardWrapper.vue';
import UserAvatar from '@/common/components/ui/UserAvatar.vue';

defineProps<{
  reviews: ReviewWithUser[];
}>();
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
            <UserAvatar :name="review.user.name || 'Користувач'" />

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

                <div class="flex items-center">
                  <StarList :stars="getStarsFromEstimation(review.rating)" />
                  <span class="ml-2 text-text-bright">{{ review.rating }}/5</span>
                </div>
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
