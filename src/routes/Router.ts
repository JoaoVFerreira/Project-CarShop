import { Router } from 'express';
import AbstractController from '../controllers/abstractController';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: AbstractController<T>,
    route: string = controller.route,
  ) {
    this.router.get(route, controller.read);
    this.router.get(`${route}:/id`, controller.readOne);
    this.router.post(route, controller.create);
    this.router.put(`${route}:/id`, controller.update);
    this.router.delete(`${route}:/id`, controller.delete);
  }
}

export default CustomRouter;