import { z } from 'zod';

export const createApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => {
  return z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema,
  });
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
