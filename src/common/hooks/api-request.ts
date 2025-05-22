import { Ref } from 'vue';
import { HttpServiceResult } from '@/serveces/types';
import { ApiResponse } from '@/common/api';
import { useToastStore } from '@/common/store';

export function useApiRequest(loading: Ref<boolean>, error: Ref<string | null>) {
  const toastStore = useToastStore();

  async function handleApiRequest<T, R>(
    apiCall: () => Promise<HttpServiceResult<ApiResponse<T>>>,
    onSuccess: (data: T) => R,
    options: {
      showToastSuccess?: boolean;
      showToastError?: boolean;
      errorMessage?: string;
      successMessage?: string;
      onError?: (error: string) => R;
    } = {}
  ) {
    const {
      showToastSuccess = true,
      showToastError = true,
      errorMessage,
      successMessage,
      onError,
    } = options;

    loading.value = true;
    error.value = null;

    const response = await apiCall();

    if ('error' in response) {
      error.value = response.error;
      if (showToastError) {
        toastStore.error(error.value);
      }
      loading.value = false;
      if (onError) {
        return onError(errorMessage ? errorMessage : response.error);
      }
      return;
    }

    if (response.success) {
      loading.value = false;
      if (showToastSuccess) {
        toastStore.success(successMessage ? successMessage : response.message);
      }
    }

    return onSuccess(response.data);
  }

  return {
    handleApiRequest,
  };
}
