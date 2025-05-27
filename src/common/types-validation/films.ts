import { z } from 'zod';
import { createApiResponseSchema } from '@/common/api';
import { PaginationSchema } from '@/common/types-validation/api';
import { BaseFilmSchema } from '@/common/types-validation/shared-schemas';
import { ReviewWithUserSchema } from '@/common/types-validation/review';

export const FilmSchema = BaseFilmSchema;

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
