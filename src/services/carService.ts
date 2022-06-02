import AbstractService, { IServiceError } from './abstractService';
import CarModel from '../models/carModel';
import { Car, CarSchema } from '../interfaces/CarInterface';

let isErrorInZod;

class CarService extends AbstractService<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  public async create(obj: Car): Promise<Car | IServiceError> {
    isErrorInZod = CarSchema.safeParse(obj);
    if (!isErrorInZod.success) {
      return { error: isErrorInZod.error };
    }
    return this.model.create(obj);
  }

  async update(id: string, obj: Car) : Promise<Car | IServiceError | null> {
    isErrorInZod = CarSchema.safeParse(obj);
    if (!isErrorInZod.success) {
      return { error: isErrorInZod.error };
    }
    return this.model.update(id, obj);
  }
}

export default CarService;