import { z } from 'zod';

export const CreateWeatherDtoSchema = z.object({
  city: z.string(),
  temperature: z.number(),
});

export type CreateWeatherDtoType = z.infer<typeof CreateWeatherDtoSchema>;
