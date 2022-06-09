import CarController from './controllers/carController';
import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/Router';
import App from './app';
import MotorcycleController from './controllers/motorcycleController';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();

const carController = new CarController();
const motorcycleController = new MotorcycleController();

const carRouter = new CustomRouter<Car>();
const motorcyleRouter = new CustomRouter<Motorcycle>();

carRouter.addRoute(carController);
motorcyleRouter.addRoute(motorcycleController);

server.addRouter(carRouter.router);
server.addRouter(motorcyleRouter.router);

export default server;