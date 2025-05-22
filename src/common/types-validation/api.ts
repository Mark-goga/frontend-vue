import { createApiResponseSchema } from '@/common/api';
import { z } from 'zod';

export const EmptyResponseSchema = createApiResponseSchema(z.object({}));
