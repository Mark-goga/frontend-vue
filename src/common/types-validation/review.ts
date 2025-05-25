import { z } from 'zod';
import { UserSchema } from '@/common/types-validation/user';

export const ReviewSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  rating: z.number().int().min(1).max(5),
  filmId: z.string(),
  userId: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ReviewWithUserSchema = ReviewSchema.extend({
  user: UserSchema,
});

export type Review = z.infer<typeof ReviewSchema>;
export type ReviewWithUser = z.infer<typeof ReviewWithUserSchema>;
