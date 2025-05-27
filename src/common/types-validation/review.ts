import { z } from 'zod';
import { UserSchema } from '@/common/types-validation/user';
import { PaginationSchema } from '@/common/types-validation/api';
import { createApiResponseSchema } from '@/common/api';
import { BaseFilmSchema, BaseReviewSchema } from '@/common/types-validation/shared-schemas';

export const ReviewSchema = BaseReviewSchema;

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

export const ReviewWithFilmSchema = ReviewSchema.extend({
  film: BaseFilmSchema,
});

export const ReviewWithUserAndFilmResponseSchema = createApiResponseSchema(
  z.object({
    reviews: z.array(ReviewWithFilmSchema),
    user: UserSchema,
  })
);

export type ReviewWithFilm = z.infer<typeof ReviewWithFilmSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type ReviewWithUser = z.infer<typeof ReviewWithUserSchema>;
export type ReviewsResponse = z.infer<typeof ReviewsResponseSchema>;
export type ReviewsWithUserResponse = z.infer<typeof ReviewsWithUserResponseSchema>;
