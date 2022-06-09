import { z } from 'zod';
import { Vehicle, VehicleSchema } from './VehicleInterface';

const MotorCycleSchema = VehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number',
  }).int({ message: 'engineCapacity must be an integer' })
    .positive({ message: 'engineCapacity must be a positive number' })
    .lte(2500, { message: 'engineCapacity must be lower or equal to 2500' }),
});

type Motorcycle = Vehicle & z.infer<typeof MotorCycleSchema>;

export { Motorcycle, MotorCycleSchema };