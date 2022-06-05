import { ZodError } from 'zod';
import Model from '../models/abstractMongoModel';

export interface IServiceError {
  error: ZodError;
}

abstract class AbstractService<T> {
  constructor(public model: Model<T>) {}

  public async create(obj: T): Promise<T | IServiceError> {
    return this.model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null | IServiceError> {
    return this.model.readOne(id);
  }

  public async update(id: string, obj: T): Promise<T | null | IServiceError> {
    return this.model.update(id, obj);
  }

  public async delete(id: string): Promise<T | null> {
    return this.model.delete(id);
  }
}

export default AbstractService;
