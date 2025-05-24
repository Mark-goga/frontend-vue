import { createApiResponseSchema } from '@/common/api';
import { z } from 'zod';

export const EmptyResponseSchema = createApiResponseSchema(z.object({}));
export const PaginationSchema = z.object({
  totalItems: z.number(),
  totalPages: z.number(),
  page: z.number(),
  limit: z.number(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});

export enum SortDirection {
  SORT_DIRECTION_ASC = 0,
  SORT_DIRECTION_DESC = 1,
}

export type FindManyDocumentsDto = {
  pagination: {
    page: number;
    limit: number;
  };
  filters?: Array<{
    field: string;
    value: string;
  }>;
  sorting?: {
    field: string;
    direction: SortDirection;
  };
};
