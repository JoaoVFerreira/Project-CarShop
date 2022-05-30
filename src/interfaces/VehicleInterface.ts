import { z } from 'zod';

const VehicleSchema = z.object({
  model: z.string(
    {
      required_error: 'Model is required',
      invalid_type_error: 'Model must be a string',
    },
  ).min(3, { message: 'Model must be 3 or more characters long' }),
  year: z.number(
    {
      required_error: 'Year is required',
      invalid_type_error: 'Year must be a number',
    },
  ).gte(1900).lte(2022),
  color: z.string(
    {
      required_error: 'Color is required',
      invalid_type_error: 'Color must be a string',
    },
  ).min(3, { message: 'Color must be 3 or more characters long' }),
  status: z.boolean().optional(),
  buyValue: z.number(
    {
      required_error: 'BuyValue is required',
    },
  ).int(),
});

type Vehicle = z.infer<typeof VehicleSchema>;

export { Vehicle, VehicleSchema };