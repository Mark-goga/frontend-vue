<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/common/store';
import CustomText from '@/common/components/ui/CustomText.vue';
import CustomButton from '@/common/components/ui/CustomButton.vue';
import { Session } from '@/views/auth/api/validations';
import { useSessionsStore } from '@/views/auth/session/store';
import ErrorText from '@/common/components/ui/ErrorText.vue';
import { getDeviceInfo } from './utils';

const sessionsStore = useSessionsStore();
const userStore = useUserStore();

const currentSessionToken = ref<string | null>(userStore.accessToken);
const isLoading = ref<boolean>(sessionsStore.loading);

const handleTerminateSession = async (session: Session) => {
  await sessionsStore.terminateSessions([session.id]);
};

const handleTerminateAllSessions = async () => {
  const otherSessionIds = sessionsStore.sessions
    .filter((session) => session.accessToken !== currentSessionToken.value)
    .map((session) => session.id);

  await sessionsStore.terminateSessions(otherSessionIds);
};

const isCurrentSession = (session: Session) => {
  return session.accessToken === currentSessionToken.value;
};

onMounted(async () => {
  await sessionsStore.fetchSessions();
});
</script>

<template>
  <div class="container mx-auto px-4 max-w-3xl py-6">
    <div class="mb-8">
      <CustomText variant="title" class="mb-2">Your Sessions</CustomText>
      <CustomText variant="subtitle" class="text-text-muted mb-6">
        Manage your active sessions across devices
      </CustomText>
    </div>

    <div class="bg-background-card rounded-xl p-6 shadow-lg mb-6">
      <div class="flex justify-between items-center mb-6">
        <CustomText variant="heading">Active Sessions</CustomText>
        <CustomButton
          v-if="sessionsStore.sessions.length > 1"
          variant="danger"
          size="sm"
          text="Terminate All Other Sessions"
          :loading="isLoading"
          :disabled="isLoading"
          @click="handleTerminateAllSessions"
        />
      </div>

      <div v-if="sessionsStore.loading" class="flex justify-center py-8">
        <div class="animate-pulse text-text-muted">Loading sessions...</div>
      </div>

      <ErrorText :error="sessionsStore.error" />

      <div v-if="sessionsStore.sessions.length === 0" class="text-center py-8">
        <CustomText variant="body" class="text-text-muted">No active sessions found</CustomText>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="session in sessionsStore.sessions"
          :key="session.id"
          class="border border-border-light rounded-lg p-4 flex flex-col md:flex-row justify-between gap-4 bg-background-elevated"
          :class="{ 'border-primary-600/30 bg-primary-600/5': isCurrentSession(session) }"
        >
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <CustomText variant="primary" class="font-semibold">
                {{ getDeviceInfo(session.userAgent) }}
              </CustomText>
              <span
                v-if="isCurrentSession(session)"
                class="px-2 py-0.5 bg-primary-600 text-white text-xs rounded-full"
              >
                Current
              </span>
            </div>
            <CustomText variant="caption" class="mb-1">
              IP Address: {{ session.ipAddress }}
            </CustomText>
            <CustomText variant="caption">
              User Agent: {{ session.userAgent.substring(0, 50) }}...
            </CustomText>
          </div>
          <div class="flex flex-col md:flex-row items-start md:items-center gap-3">
            <CustomButton
              v-if="!isCurrentSession(session)"
              variant="danger"
              size="sm"
              text="Terminate"
              :disabled="isLoading"
              :loading="isLoading"
              @click="handleTerminateSession(session)"
            />
            <CustomButton v-else variant="outline" size="sm" text="Current Session" disabled />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-background-card rounded-xl p-6 border border-border-light">
      <CustomText variant="heading" class="mb-4">Session Security</CustomText>
      <CustomText variant="body" class="mb-3">
        We keep track of your sessions for security purposes. If you notice any suspicious activity,
        you should terminate those sessions immediately and change your password.
      </CustomText>
      <CustomText variant="caption">
        Note: Terminating your current session will log you out.
      </CustomText>
    </div>
  </div>
</template>
