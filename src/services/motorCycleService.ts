import AbstractService, { IServiceError } from './abstractService';
import MotorcycleModel from '../models/motorCycleModel';
import { 
  Motorcycle,
  MotorCycleSchema,
} from '../interfaces/MotorcycleInterface';

let isErrorInZod;

class MotorcycleService extends AbstractService<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  public async create(obj: Motorcycle): Promise<Motorcycle | IServiceError> {
    isErrorInZod = MotorCycleSchema.safeParse(obj);
    if (!isErrorInZod.success) {
      return { error: isErrorInZod.error };
    }
    return this.model.create(obj);
  }

  async update(id: string, obj: Motorcycle) 
    : Promise<Motorcycle | IServiceError | null> {
    isErrorInZod = MotorCycleSchema.safeParse(obj);
    if (!isErrorInZod.success) {
      return { error: isErrorInZod.error };
    }
    return this.model.update(id, obj);
  }
}

export default MotorcycleService;