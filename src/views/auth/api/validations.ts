import { z } from 'zod';
import { ApiResponse, createApiResponseSchema } from '@/common/api';
import { UserSchema } from '@/common/types-validation';

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  name: string;
  email: string;
  password: string;
};

export type RemoveSessionsDto = {
  ids: string[];
};

export const SessionSchema = z.object({
  id: z.string(),
  userAgent: z.string(),
  ipAddress: z.string(),
  accessToken: z.string(),
});

export const AuthResponseWithUserSchema = z.object({
  accessToken: z.string(),
  user: UserSchema,
});

export const SessionsSchema = z.object({
  sessions: z.array(SessionSchema),
});

export const AuthResponseSchema = createApiResponseSchema(AuthResponseWithUserSchema);
export const SessionsResponseSchema = createApiResponseSchema(SessionsSchema);

export type Session = z.infer<typeof SessionSchema>;
export type Sessions = z.infer<typeof SessionsSchema>;
export type AuthResponseWithUser = z.infer<typeof AuthResponseWithUserSchema>;

export type AuthResponse = ApiResponse<AuthResponseWithUser>;
export type SessionsResponse = ApiResponse<Sessions>;
export type EmptyResponse = ApiResponse<Record<string, never>>;

export const LoginResponseSchema = createApiResponseSchema(
  z.object({
    accessToken: z.string(),
    user: UserSchema,
  })
);

export type LoginResponse = ApiResponse<z.infer<typeof LoginResponseSchema>>;
