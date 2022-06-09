import { Response } from 'express';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import AbstractController, 
{ RequestWithBody, ResponseError } from './abstractController';
import MotorcycleService from '../services/motorCycleService';

class MotorcycleController extends AbstractController<Motorcycle> {
  private _route: string;

  constructor(
    public service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  public readOne = async (
    req: RequestWithBody<Motorcycle>, 
    res: Response<Motorcycle | null | ResponseError>,
  ) : Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (!id) return res.status(412).json({ error: this.errors.requiredId });
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.shortId });
      } 
      const oneObject = await this.service.readOne(id);
      if (!oneObject) {
        return res.status(404).json({ error: this.errors.invalidId });
      }
      return res.status(200).json(oneObject);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  public create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const motoObject = await this.service.create(req.body);
      if ('error' in motoObject) {
        return res.status(400).json(motoObject);
      }
      return res.status(201).json(motoObject);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  public update = async (
    req: RequestWithBody<Motorcycle>, 
    res: Response<Motorcycle | ResponseError | null | void>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (Object.keys(req.body).length === 0) return res.status(400).json();
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.shortId });
      } 
      const updateMoto = await this.service.update(id, req.body);
      if (!updateMoto) {
        return res.status(404).json({ error: this.errors.invalidId });
      }
      return res.status(200).json(updateMoto);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default MotorcycleController;