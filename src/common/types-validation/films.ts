import { z } from 'zod';
import { createApiResponseSchema } from '@/common/api';
import { PaginationSchema } from '@/common/types-validation/api';
import { ReviewWithUserSchema } from '@/common/types-validation/review';

const FilmSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  director: z.string(),
  releaseDate: z.string(),
  genre: z.array(z.string()),
  estimation: z.number(),
  backGroundImageKey: z.string().optional(),
  avatarImageKey: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const FilmsResponseSchema = createApiResponseSchema(
  z.object({
    films: z.array(FilmSchema),
    pagination: PaginationSchema,
  })
);

export const FilmDetailsResponseSchema = createApiResponseSchema(
  z.object({
    film: FilmSchema,
    reviews: z.array(ReviewWithUserSchema),
  })
);

export const FilmResponseSchema = createApiResponseSchema(FilmSchema);
export type FilmResponse = z.infer<typeof FilmResponseSchema>;
export type Film = z.infer<typeof FilmSchema>;

export type CreateFilmDto = {
  title: string;
  description: string;
  director: string;
  releaseDate: string;
  genre: string;
  backGroundImageKey?: string;
};

export type UpdateFilmDto = {
  title?: string;
  description?: string;
  director?: string;
  releaseDate?: string;
  genre?: string;
  backGroundImageKey?: string;
};
