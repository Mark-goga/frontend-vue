import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Session } from '@/views/auth/api/validations';
import { authApi } from '@/views/auth/api/auth';
import { useApiRequest } from '@/common/hooks';

export const useSessionsStore = defineStore('sessions', () => {
  const sessions = ref<Session[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const { handleApiRequest } = useApiRequest(loading, error);

  async function fetchSessions() {
    await handleApiRequest(
      () => authApi.getSessions(),
      (data) => {
        sessions.value = data.sessions;
      },
      {
        showToastSuccess: false,
      }
    );
  }

  async function terminateSessions(sessionIds: string[]) {
    await handleApiRequest(
      () => authApi.removeSessions({ ids: sessionIds }),
      () => {
        sessions.value = sessions.value.filter((session) => !sessionIds.includes(session.id));
      }
    );
  }

  return {
    sessions,
    loading,
    error,
    fetchSessions,
    terminateSessions,
  };
});
