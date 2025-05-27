import { z } from 'zod';

export const BaseFilmSchema = z.object({
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

export const BaseReviewSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  rating: z.number().int().min(1).max(10),
  filmId: z.string(),
  userId: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
