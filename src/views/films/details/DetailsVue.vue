<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import CustomLoader from '@/common/components/ui/CustomLoader.vue';
import ErrorText from '@/common/components/ui/ErrorText.vue';
import FilmNotFound from '@/views/films/components/FilmNotFound.vue';
import { useFilmDetailsStore } from '@/views/films/details/store';
import { storeToRefs } from 'pinia';
import InformationAboutFilm from '@/common/components/film/informationAboutFilm.vue';
import FilmReviews from '@/views/films/details/components/FilmReviews.vue';
import CustomModal from '@/common/components/ui/CustomModal.vue';
import InputField from '@/common/components/form/inputField.vue';
import CustomButton from '@/common/components/ui/CustomButton.vue';
import { Form } from 'vee-validate';
import { CreateReviewDto } from '@/common/types-validation';
import StarList from '@/common/components/ui/StarList.vue';
import { useCreateReview } from '@/common/hooks/review/create-rewiev';
import CustomText from '@/common/components/ui/CustomText.vue';

const route = useRoute();
const filmId = route.params.filmId as string;

const store = useFilmDetailsStore();
const { film, loading, error, reviews } = storeToRefs(store);
const { fetchFilmDetails } = store;

const isReviewModalOpen = ref(false);
const createReviewStore = useCreateReview();
const { loading: createReviewLoading, error: createReviewError } = storeToRefs(createReviewStore);
const rating = ref(5);

const openReviewModal = () => {
  isReviewModalOpen.value = true;
};

const closeReviewModal = () => {
  isReviewModalOpen.value = false;
};

const handleSubmitReview = async (values: any) => {
  const reviewData: CreateReviewDto = {
    filmId: filmId,
    title: values.title,
    description: values.review,
    rating: rating.value,
  };

  await createReviewStore.createReview(reviewData);
  if (createReviewError) {
    closeReviewModal();
    await fetchFilmDetails(filmId);
  }
};

onMounted(async () => {
  await fetchFilmDetails(filmId);
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <CustomLoader v-if="loading" />
    <ErrorText :error="error" />
    <FilmNotFound v-if="!film" />

    <template v-if="film">
      <InformationAboutFilm :film="film" />
      <div class="my-10 border-t border-gray-700 opacity-30"></div>

      <div class="justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-white">Відгуки</h2>
        <div class="flex items-center justify-between gap-4 mt-4">
          <CustomText text="Хочеш залишити відгук про даний фільм? тоді натискай на кнопку" />
          <CustomButton
            text="Залишити відгук"
            @click="openReviewModal"
            :outlined="true"
            class="border-secondary-700 text-secondary-700"
            variant="outline"
          />
        </div>
      </div>

      <FilmReviews :reviews="reviews" />
    </template>

    <CustomModal
      :is-open="isReviewModalOpen"
      @close="closeReviewModal"
      title="Write a Review"
      width-class="max-w-lg"
    >
      <Form @submit="handleSubmitReview" :initial-values="{ title: '', review: '' }" class="w-full">
        <InputField
          label="Review Title"
          type="text"
          name="title"
          rules="required|min:3"
          placeholder="Enter review title"
        />

        <InputField
          label="Your Review"
          type="textarea"
          name="review"
          rules="required|min:10"
          placeholder="Share your thoughts about this film..."
          class="min-h-[120px]"
        />

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-200 mb-1"> Rating </label>
          <div class="flex items-center">
            <StarList
              :total-stars="10"
              :active-stars="rating"
              @click="(value: any) => (rating = value)"
              :is-interactive="true"
              class="text-2xl"
            />
            <span class="ml-2 text-gray-200">{{ rating }}/10</span>
          </div>
        </div>

        <div class="flex justify-end gap-4 mt-6">
          <CustomButton text="Cancel" type="button" :outlined="true" @click="closeReviewModal" />
          <CustomButton type="submit" text="Submit Review" :loading="createReviewStore.loading" />
        </div>
      </Form>
    </CustomModal>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
