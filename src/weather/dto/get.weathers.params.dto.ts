import { z } from 'zod';
import { PaginationDtoSchema } from '../../common/dto/pagination.dto';

export const GetWeathersParamsDtoSchema = PaginationDtoSchema.extend({
  city: z.string().optional(),
});

export type GetWeathersParamsDtoType = z.infer<
  typeof GetWeathersParamsDtoSchema
>;
