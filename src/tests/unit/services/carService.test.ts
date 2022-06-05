import { expect } from 'chai';
import Sinon from 'sinon';
import carMock from "../../mocks/carMock";
import { Car } from '../../../interfaces/CarInterface';
import CarService from '../../../services/carService';
import { IServiceError } from '../../../services/abstractService';

const HOT: string = 'HOT' // DEMORA ATÉ 6 SEGUNDOS
const UNIT: string = 'UNIT' // IDENTIFICADOR DE TESTE UNITÁRIO

let carService = new CarService();
let car: Car | Car[] | IServiceError | null;

describe(`Car Service ${UNIT} ${HOT}`, () => { 
  describe('#Create', () => {
    describe('Success cases', () => {
      before(() => Sinon.stub(carService.model, 'create').resolves(carMock.car));
      after(() => Sinon.restore());
  
      it('should return the created car', async () => {
        car = await carService.create(carMock.params);
        expect(car).to.deep.eq(carMock.car);
      });
    });

    describe('Failure cases', () => {
      before(() => Sinon.stub(carService.model, 'create').resolves(carMock.car));
      after(() => Sinon.restore());
  
      it('should return error', async () => {
        car = await carService.create(carMock.invalid);
        expect(car).to.haveOwnProperty('error');
      });
    });
  });

  describe('#Read', () => {
    describe('Success cases', () => {
      before(() => Sinon.stub(carService.model, 'read').resolves(carMock.read as Car[]));
      after(() => Sinon.restore());
      it('should return a list of cars', async () => {
        car = await carService.read();
        expect(car).to.deep.eq(carMock.read);
      });
    });

    describe('Failure cases', () => {
      before(() => Sinon.stub(carService.model, 'read').resolves([]));
      after(() => Sinon.restore());
      it('should return an empty list of cars', async () => {
        car = await carService.read();
        expect(car).to.deep.eq([]);
      });
    });
  });

  describe('#ReadOne', () => {
    describe('Success cases', () => {
      before(() => Sinon.stub(carService.model, 'readOne').resolves(carMock.car as Car));
      after(() => Sinon.restore());
      it('should return ONE cars', async () => {
        car = await carService.readOne(carMock.car._id);
        expect(car).to.deep.eq(carMock.car);
      });
    });

    describe('Failure cases', () => {
      before(() => Sinon.stub(carService.model, 'readOne').resolves(null));
      after(() => Sinon.restore());
      it('should return null', async () => {
        car = await carService.readOne(carMock.car._id);
        expect(car).to.be.null;
      });
    });
  });

  describe('#Update', () => {
    describe('Success cases', () => {
      before(() => Sinon.stub(carService.model, 'update').resolves(carMock.update as any));
      after(() => Sinon.restore());
      it('should return an updated car', async () => {
        car = await carService.update(carMock.car._id, carMock.update);
        expect(car).to.deep.eq(carMock.update);
      });
    });

    describe('Failure cases', () => {
      it('should return null', async () => {
        car = await carService.update(carMock.update._id, carMock.invalid);
        expect(car).to.haveOwnProperty('error');
      });
    });
  });

  describe('#Delete', () => {
    describe('Success cases', () => {
      before(() => Sinon.stub(carService.model, 'delete').resolves(carMock.car as Car));
      after(() => Sinon.restore());
      it('should delete a car', async () => {
        car = await carService.delete(carMock.car._id);
        expect(car).to.deep.eq(carMock.car);
      });
    });

    describe('Failure cases', () => {
      before(() => Sinon.stub(carService.model, 'delete').resolves(null as any));
      after(() => Sinon.restore());
      it('should return null', async () => {
        car = await carService.delete(carMock.car._id);
        expect(car).to.be.null;
      });
    });
  });
});