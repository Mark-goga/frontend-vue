import { z } from 'zod';
import { UserSchema } from '@/common/types-validation/user';
import { PaginationSchema } from '@/common/types-validation/api';
import { createApiResponseSchema } from '@/common/api';

export const ReviewSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  rating: z.number().int().min(1).max(10),
  filmId: z.string(),
  userId: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ReviewWithUserSchema = ReviewSchema.extend({
  user: UserSchema,
});

export type CreateReviewDto = {
  filmId: string;
  description: string;
  title: string;
  rating: number;
};

export type UpdateReviewDto = {
  id: string;
  description?: string;
  title?: string;
  rating?: string;
};

export const ReviewResponseSchema = createApiResponseSchema(ReviewSchema);
export const ReviewsResponseSchema = z.object({
  reviews: z.array(ReviewSchema),
  pagination: PaginationSchema,
});

export const ReviewsWithUserResponseSchema = z.object({
  reviews: z.array(ReviewWithUserSchema),
  pagination: PaginationSchema,
});

export type Review = z.infer<typeof ReviewSchema>;
export type ReviewWithUser = z.infer<typeof ReviewWithUserSchema>;
export type ReviewsResponse = z.infer<typeof ReviewsResponseSchema>;
export type ReviewsWithUserResponse = z.infer<typeof ReviewsWithUserResponseSchema>;
