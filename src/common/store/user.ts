import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { User } from '@/common/types-validation/user';
import { authApi } from '@/views/auth/api/auth';
import { useApiRequest } from '@/common/hooks';
import { apiService } from '@/serveces/http-service-instance';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const { handleApiRequest } = useApiRequest(loading, error);

  function setUserData(userData: User, token: string) {
    user.value = userData;
    accessToken.value = token;
    apiService.setDefaultHeader('Authorization', `Bearer ${token}`);
    localStorage.setItem('accessToken', token);
  }

  function clearUserData() {
    user.value = null;
    accessToken.value = null;
    apiService.removeDefaultHeader('Authorization');
    localStorage.removeItem('accessToken');
  }

  async function login(email: string, password: string) {
    await handleApiRequest(
      () => authApi.login({ email, password }),
      (data) => {
        setUserData(data.user, data.accessToken);
      }
    );
  }

  async function register(name: string, email: string, password: string) {
    await handleApiRequest(
      () => authApi.register({ name, email, password }),
      (data) => {
        setUserData(data.user, data.accessToken);
      }
    );
  }

  async function logout() {
    await handleApiRequest(
      () => authApi.logout(),
      () => {
        clearUserData();
      }
    );
  }

  async function refreshToken() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      await handleApiRequest(
        () => authApi.refresh(),
        (data) => {
          setUserData(data.user, data.accessToken);
        },
        {
          onError: () => {
            clearUserData();
          },
        }
      );
    }
  }

  const isAuthenticated = computed(() => {
    const hasToken = !!accessToken.value;
    const hasUser = !!user.value;
    console.log('Auth state:', { hasToken, hasUser, token: accessToken.value });
    return hasToken && hasUser;
  });

  return {
    user,
    accessToken,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    refreshToken,
  };
});
