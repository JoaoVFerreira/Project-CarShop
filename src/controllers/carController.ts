import { Response } from 'express';
import { Car } from '../interfaces/CarInterface';
import AbstractController, 
{ RequestWithBody, ResponseError } from './abstractController';
import CarService from '../services/carService';

class CarController extends AbstractController<Car> {
  private _route: string;

  constructor(
    protected service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  public create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const carObject = await this.service.create(req.body);
      if ('error' in carObject) {
        return res.status(400).json(carObject);
      }
      return res.status(201).json(carObject);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  public update = async (
    req: RequestWithBody<Car>, 
    res: Response<Car | ResponseError | null>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (!id) return res.status(412).json({ error: this.errors.requiredId });
      const updateCar = await this.service.update(id, req.body);
      if (updateCar) {
        return res.status(400).json(updateCar);
      }
      return res.status(201).json(updateCar);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarController;