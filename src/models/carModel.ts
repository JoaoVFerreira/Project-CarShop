import { Schema, model as createModel, Document } from 'mongoose';
import AbstractMongoModel from './abstractMongoModel';
import { Car } from '../interfaces/CarInterface';

interface CarDocument extends Car, Document {}

const carSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, {
  versionKey: false,
});

class CarModel extends AbstractMongoModel<Car> {
  constructor(model = createModel('Cars', carSchema)) {
    super(model);
  }
}

export default CarModel;