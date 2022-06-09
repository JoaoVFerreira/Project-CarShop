import { Schema, model as createModel, Document } from 'mongoose';
import AbstractMongoModel from './abstractMongoModel';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

interface MotorCycleDocument extends Motorcycle, Document {}

const MotorCycleSchema = new Schema<MotorCycleDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, {
  versionKey: false,
});

class MotorcycleModel extends AbstractMongoModel<Motorcycle> {
  constructor(model = createModel('Motorcycles', MotorCycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;