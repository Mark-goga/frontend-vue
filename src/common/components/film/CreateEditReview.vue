<script lang="ts" setup>
import CustomButton from '@/common/components/ui/CustomButton.vue';
import InputField from '@/common/components/form/inputField.vue';
import { Form } from 'vee-validate';
import CustomText from '@/common/components/ui/CustomText.vue';
import ReviewStarRating from '@/views/films/details/components/ReviewStarRating.vue';
import CustomModal from '@/common/components/ui/CustomModal.vue';
import { ref } from 'vue';

type InitialValuesType = {
  title: string;
  review: string;
};

const props = defineProps<{
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit: (values: InitialValuesType & { rating: number }) => Promise<void>;
  initialValues: InitialValuesType;
  loading: boolean;
}>();

const rating = ref(5);

const onSubmit = (values: InitialValuesType) => {
  return props.handleSubmit({
    ...values,
    rating: rating.value,
  });
};
</script>

<template>
  <CustomModal
    :is-open="isOpen"
    @close="closeModal"
    title="Залишити відгук"
    width-class="max-w-2xl"
  >
    <Form @submit="onSubmit" :initial-values="initialValues" class="w-full">
      <div class="review-form">
        <div class="mb-6">
          <CustomText text="Оцініть фільм" variant="subtitle" class="mb-2" />
          <ReviewStarRating v-model:value="rating" :totalStars="10" />
        </div>

        <div class="grid grid-cols-1 gap-6">
          <InputField
            label="Заголовок відгуку"
            type="text"
            name="title"
            rules="required|min:3"
            placeholder="Напишіть заголовок для вашого відгуку"
            class="review-input input-field text-text-bright"
            classForError="right-4"
          />

          <InputField
            label="Ваш відгук"
            type="textarea"
            name="review"
            rules="required|min:10"
            placeholder="Поділіться вашими враженнями про фільм..."
            class="min-h-[150px] review-textarea input-field text-text-bright"
            classForError="right-4"
          />
        </div>
        <div class="flex justify-end gap-4 mt-8">
          <CustomButton
            text="Скасувати"
            type="button"
            :outlined="true"
            @click="closeModal"
            class="border-gray-500 hover:bg-gray-500/10"
          />
          <CustomButton
            type="submit"
            text="Опублікувати"
            :loading="loading"
            class="bg-gradient-to-r from-secondary-700 to-secondary-500 hover:from-secondary-600 hover:to-secondary-400"
          />
        </div>
      </div>
    </Form>
  </CustomModal>
</template>

<style scoped>
.review-form {
  padding: 1rem;
  border-radius: 1rem;
  background-color: rgba(25, 25, 30, 0.3);
  backdrop-filter: blur(10px);
}

.review-form :deep(.input-field) {
  border-radius: 0.75rem;
  border: 1px solid rgba(75, 85, 95, 0.5);
  background-color: rgba(35, 35, 40, 0.6);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.review-form :deep(.input-field:focus) {
  border-color: #329c51;
  box-shadow: 0 0 0 2px #e8f7ec;
}

.review-form :deep(textarea) {
  min-height: 150px;
  border-radius: 0.75rem;
}

.review-form :deep(label) {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
}
</style>
