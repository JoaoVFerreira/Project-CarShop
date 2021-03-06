import { Request, Response } from 'express';
import AbstractService from '../services/abstractService';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

export enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Error not Found',
  requiredId = 'Id is required',
  badRequest = 'Bad Request',
  shortId = 'Id must have 24 hexadecimal characters',
  invalidId = 'Object not found',
}

abstract class AbstractController<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: AbstractService<T>) {}

  abstract create(req: RequestWithBody<T>, res: Response<T | ResponseError>)
  : Promise<typeof res>;

  public read = async (_req: Request, res: Response<T[] | ResponseError>)
  : Promise<typeof res> => {
    try {
      const objects = await this.service.read();
      return res.status(200).json(objects);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  abstract readOne(
    req: RequestWithBody<T>, 
    res: Response<T | null | ResponseError>)
  : Promise<typeof res>;

  abstract update(
    req: RequestWithBody<T>,
    res: Response<T | null | ResponseError | void>)
  : Promise<typeof res>;

  public delete = async (
    req: RequestWithBody<T>, 
    res: Response<T | null | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (!id) return res.status(412).json({ error: this.errors.requiredId });
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.shortId });
      } 
      const deletedObject = await this.service.delete(id);
      if (!deletedObject) {
        return res.status(404).json({ error: this.errors.invalidId });
      }
      return res.status(204).json(deletedObject);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default AbstractController;