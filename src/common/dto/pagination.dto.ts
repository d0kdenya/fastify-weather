import { z } from 'zod';

export const PaginationDtoSchema = z.object({
  limit: z.number().int().optional(),
  offset: z.number().int().optional(),
});
