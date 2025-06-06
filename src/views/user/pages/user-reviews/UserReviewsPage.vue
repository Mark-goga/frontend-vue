<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserReviewsStore } from '@/views/user/pages/user-reviews/store';
import { storeToRefs } from 'pinia';
import CustomLoader from '@/common/components/ui/CustomLoader.vue';
import ErrorText from '@/common/components/ui/ErrorText.vue';
import CardWrapper from '@/common/components/ui/CardWrapper.vue';
import CustomText from '@/common/components/ui/CustomText.vue';
import StarWithRating from '@/common/components/film/StarWithRating.vue';
import UserDontHaveReview from '@/views/user/components/UserDontHaveReview.vue';
import UserInfo from '@/views/user/pages/user-reviews/components/UserInfo.vue';
import PersonalFilms from '@/views/user/pages/user-reviews/components/PersonalFilms.vue';
import ListOfText from '@/common/components/ui/ListOfText.vue';
import ActionsMenu from '@/common/components/ui/ActionsMenu.vue';
import { useUserStore } from '@/common/store';
import { Review } from '@/common/types-validation';
import CreateEditReview from '@/common/components/film/CreateEditReview.vue';

const route = useRoute();
const router = useRouter();
const userId = ref(route.params.userId as string);

const userStore = useUserStore();
const { user: currentUser } = storeToRefs(userStore);
const isCurrentUser = computed(() => currentUser.value?.id === userId.value);

const store = useUserReviewsStore();
const { loading, error, user, reviews } = storeToRefs(store);
const { fetchUserReviews, editReview, deleteReview } = store;

const navigateToFilm = (filmId: string) => {
  router.push(`/films/${filmId}`);
};

const isOpenReviewModal = ref<boolean>(false);
const currentReviewToEdit = ref<Review | null>(null);
const initialValuesForReview = ref({
  title: '',
  review: '',
});

const openEditReviewModal = (review: Review) => {
  currentReviewToEdit.value = review;
  isOpenReviewModal.value = true;
  initialValuesForReview.value = {
    title: review.title,
    review: review.description,
  };
};

const closeReviewModal = () => {
  isOpenReviewModal.value = false;
  currentReviewToEdit.value = null;
};

const handleEditReviewSubmit = async (reviewData: any) => {
  if (!currentReviewToEdit.value) return;
  const description = reviewData.review;
  delete reviewData.review;

  await editReview(currentReviewToEdit.value.id, {
    ...reviewData,
    description,
  });
  closeReviewModal();
};

const reviewActions = [
  {
    label: 'Редагувати',
    action: (review: Review) => openEditReviewModal(review),
  },
  {
    label: 'Видалити',
    action: (review: Review) => deleteReview(review.id),
  },
];

onMounted(() => {
  if (userId.value) {
    fetchUserReviews(userId.value);
  }
});
</script>

<template>
  <div class="max-w-[1300px] mx-auto px-4 py-8">
    <CustomLoader v-if="loading" />
    <ErrorText :error="error" />

    <CreateEditReview
      :isOpen="isOpenReviewModal && currentReviewToEdit"
      :handleSubmit="handleEditReviewSubmit"
      :loading="loading"
      :initialValues="initialValuesForReview"
      :closeModal="closeReviewModal"
    />

    <template v-if="user">
      <UserInfo />

      <div v-if="reviews.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardWrapper
          v-for="review in reviews"
          :key="review.id"
          class="p-0 h-full flex flex-col transition-all duration-300 hover:shadow-xl overflow-hidden border border-gray-800 hover:border-gray-700"
        >
          <div class="film-section p-5 bg-gray-900 bg-opacity-40">
            <div class="flex gap-6">
              <div class="relative group" @click="navigateToFilm(review.film.id)">
                <img
                  :src="review.film.avatarImageKey"
                  :alt="review.film.title"
                  class="w-32 h-48 object-cover rounded-md shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-md transition-all duration-300 cursor-pointer"
                ></div>
              </div>
              <div class="flex-1">
                <h2
                  class="text-xl font-bold text-gray-100 mb-2 cursor-pointer hover:text-blue-400 transition-colors"
                  @click="navigateToFilm(review.film.id)"
                >
                  {{ review.film.title }}
                </h2>
                <StarWithRating :rating="review.rating" class="mb-3" />
                <CustomText class="text-gray-300 line-clamp-3">
                  {{ review.film.description }}
                </CustomText>
                <ListOfText :texts="review.film.genre" />
              </div>
            </div>
          </div>

          <div class="review-section p-5 bg-gray-800 bg-opacity-30 flex-1">
            <div class="mb-2 flex items-center justify-between">
              <CustomText variant="title" class="text-blue-300">Коментар</CustomText>
              <div class="flex items-center gap-2">
                <div class="text-sm text-gray-400">
                  {{ new Date(review.createdAt).toLocaleDateString() }}
                </div>

                <ActionsMenu
                  v-if="isCurrentUser"
                  :actions="reviewActions"
                  :current-item="review"
                  class="ml-2"
                />
              </div>
            </div>

            <div
              v-if="review.title"
              class="font-bold text-gray-200 mb-2 text-lg border-l-4 border-blue-500 pl-3"
            >
              {{ review.title }}
            </div>

            <div class="my-3">
              <StarWithRating :rating="review.rating" />
            </div>

            <div class="mt-3 p-3 bg-gray-900 bg-opacity-40 rounded-md">
              <CustomText class="text-gray-300 whitespace-pre-wrap">
                {{ review.description }}
              </CustomText>
            </div>
          </div>
        </CardWrapper>
      </div>
      <UserDontHaveReview v-else class="mt-3" />
      <PersonalFilms />
    </template>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.film-section,
.review-section {
  position: relative;
}

.film-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(107, 114, 128, 0.5), transparent);
}

.actions-dropdown {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}
</style>
