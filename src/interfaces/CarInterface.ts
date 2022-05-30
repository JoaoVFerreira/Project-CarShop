import { z } from 'zod';
import { Vehicle, VehicleSchema } from './VehicleInterface';

const CarSchema = VehicleSchema.extend({
  doorsQty: z.number().gte(2, {
    message: 'A quantidade de portas não pode ser menor que 2',
  }).lte(4, {
    message: 'A quantidade de portas não pode ser maior que 4',
  }),
  seatsQty: z.number().gte(2, {
    message: 'A quantidade de assentos não pode ser menor que 2',
  }).lte(7, {
    message: 'A quantidade de assentos não pode ser maior que 7',
  }),
});

type Car = Vehicle & z.infer<typeof CarSchema>;

export { Car, CarSchema };