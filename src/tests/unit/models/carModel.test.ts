import { expect } from 'chai';
import Sinon from 'sinon';
import carMock from "../../mocks/carMock";
import CarModel from "../../../models/carModel";
import AbstractMongoModel from '../../../models/abstractMongoModel';
import { Car } from '../../../interfaces/CarInterface';

const HOT: string = 'HOT' // DEMORA ATÉ 6 SEGUNDOS
const UNIT: string = 'UNIT' // IDENTIFICADOR DE TESTE UNITÁRIO

let carModel: AbstractMongoModel<Car> = new CarModel();
let car: Car | Car[] | null;

describe(`Car Model ${UNIT} ${HOT}`, () => { 
  describe('#Create', () => {
    before(() => Sinon.stub(carModel.model, 'create').resolves(carMock.car));
    after(() => Sinon.restore());

    describe('Success cases', () => {
      it('should return the created car', async () => {
        car = await carModel.create(carMock.params);
        expect(car).to.deep.eq(carMock.car);
      });
    });
  });

  describe('#Read', () => {
    describe('Success cases', () => {
      before(() => Sinon.stub(carModel.model, 'find').resolves(carMock.read as any));
      after(() => Sinon.restore());
      it('should return a list of cars', async () => {
        car = await carModel.read();
        expect(car).to.deep.eq(carMock.read);
      });
    });

    describe('Failure cases', () => {
      before(() => Sinon.stub(carModel.model, 'find').resolves([]));
      after(() => Sinon.restore());
      it('should return an empty list of cars', async () => {
        car = await carModel.read();
        expect(car).to.deep.eq([]);
      });
    });
  });

  describe('#ReadOne', () => {
    describe('Success cases', () => {
      before(() => Sinon.stub(carModel.model, 'findById').resolves(carMock.car as any));
      after(() => Sinon.restore());
      it('should return ONE cars', async () => {
        car = await carModel.readOne(carMock.car._id);
        expect(car).to.deep.eq(carMock.car);
      });
    });

    describe('Failure cases', () => {
      before(() => Sinon.stub(carModel.model, 'findById').resolves(null));
      after(() => Sinon.restore());
      it('should return null', async () => {
        car = await carModel.readOne(carMock.car._id);
        expect(car).to.be.null;
      });
    });
  });

  describe('#Update', () => {
    describe('Success cases', () => {
      before(() => Sinon.stub(carModel.model, 'findByIdAndUpdate').resolves(carMock.update as any));
      after(() => Sinon.restore());
      it('should return an updated car', async () => {
        car = await carModel.update(carMock.car._id, carMock.update);
        expect(car).to.deep.eq(carMock.update);
      });
    });

    describe('Failure cases', () => {
      before(() => Sinon.stub(carModel.model, 'findByIdAndUpdate').resolves(null as any));
      after(() => Sinon.restore());
      it('should return null', async () => {
        car = await carModel.update(carMock.update._id, carMock.update);
        expect(car).to.be.null;
      });
    });
  });

  describe('#Delete', () => {
    describe('Success cases', () => {
      before(() => Sinon.stub(carModel.model, 'findByIdAndDelete').resolves(carMock.car as any));
      after(() => Sinon.restore());
      it('should delete a car', async () => {
        car = await carModel.delete(carMock.car._id);
        expect(car).to.deep.eq(carMock.car);
      });
    });

    describe('Failure cases', () => {
      before(() => Sinon.stub(carModel.model, 'findByIdAndDelete').resolves(null as any));
      after(() => Sinon.restore());
      it('should return null', async () => {
        car = await carModel.delete(carMock.car._id);
        expect(car).to.be.null;
      });
    });
  });
});