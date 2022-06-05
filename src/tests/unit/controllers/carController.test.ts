import { expect } from 'chai';
import Sinon from 'sinon';
import carMock from "../../mocks/carMock";
import { Car } from '../../../interfaces/CarInterface';
import { IServiceError } from '../../../services/abstractService';
import CarController from '../../../controllers/carController';
import { Response, Request } from 'express';
import { RequestWithBody } from '../../../controllers/abstractController';

const HOT: string = 'HOT' // DEMORA ATÉ 6 SEGUNDOS
const UNIT: string = 'UNIT' // IDENTIFICADOR DE TESTE UNITÁRIO

let carController = new CarController();
// let car: Car | Car[] | IServiceError | null;
let req = {} as RequestWithBody<Car>;
let res = {} as Response;

describe(`Car Controller ${UNIT} ${HOT}`, () => { 
  describe('Get the /cars route', () => {
    it('must return the /cars route', () => {
      const route = carController.route;
      expect(route).to.be.eq('/cars');
    });
  });

  describe('#Create', () => {
    describe('Success cases', () => {
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'create').resolves(carMock.car);
      });
      after(() => Sinon.restore());
  
      it('should return status 201 and a car', async () => {
        await carController.create(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(201));
        expect((res.json as Sinon.SinonStub).calledWith(carMock.car));
      });
    });

    describe('Failure cases', () => {
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'create').resolves(carMock.zodError as any);
      });
      after(() => Sinon.restore());
  
      it('should return 400 and a ZodError', async () => {
        await carController.create(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(400));
        expect((res.json as Sinon.SinonStub).calledWith(carMock.zodError));
      });
    });
  });

  describe('#Read', () => {
    describe('Success', () => {
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'read').resolves(carMock.read);
      });
      after(() => Sinon.restore());
    
      it('must call status function with value 200', async () => {
        await carController.read(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(200));
        expect((res.json as Sinon.SinonStub).calledWith(carMock.read));
      });
    });

    describe('Failure cases', () => {
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'read').throws();
      });
      after(() => Sinon.restore());
  
      it('should return status 500', async () => {
        await carController.read(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(500));
      });
    });
  });

  describe('#ReadOne', () => {
    describe('Success cases', () => {
      req = { params: { id: '4edd40c86762e0fb12000003' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'readOne').resolves(carMock.car);
      });
      after(() => Sinon.restore());
    
      it('must call status function with value 200', async () => {
        await carController.readOne(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(200));
        expect((res.json as Sinon.SinonStub).calledWith(carMock.car));
      });
    });

    describe('Failure cases', () => {
      it('should return status 404', async () => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'readOne').resolves(null);

        await carController.readOne(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(404));
        Sinon.restore()
      });

      it('should return status 500', async () => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'readOne').throws();

        await carController.readOne(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(500));
        Sinon.restore();
      });

      it('should return status 400', async () => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'readOne').resolves(carMock.car);
  
        await carController.readOne(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(400));
        expect((res.json as Sinon.SinonStub).calledWith({
          error: 'Id must have 24 hexadecimal characters'
        }));
        Sinon.restore()
      });
    });
  });

  describe('#Update', () => {
    describe('Sucess cases', () => {
      req = { params: { id: '4edd40c86762e0fb12000003' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'update').resolves(carMock.update);
      });
      after(() => Sinon.restore());
  
      it('should return status 200', async () => {
        await carController.update(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(200));
        expect((res.json as Sinon.SinonStub).calledWith(carMock.update));
      });
    });

    describe('Failure cases', () => {
      it('should return status 404', async () => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'update').resolves(null);

        await carController.update(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(404));
        Sinon.restore()
      });

      it('should return status 400', async () => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'update').resolves(carMock.car);
        await carController.update(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(400));
        expect((res.json as Sinon.SinonStub).calledWith({
          error: 'Id must have 24 hexadecimal characters'
        }));
        Sinon.restore()
      });

      it('should return status 500', async () => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'update').throws();

        await carController.update(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(500));
        Sinon.restore()
      });
    });
  });

  describe('#Delete', () => {
    describe('Sucess cases', () => {
      req = { params: { id: '4edd40c86762e0fb12000003' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'delete').resolves(carMock.car);
      });
      after(() => Sinon.restore());
  
      it('should return status 200', async () => {
        await carController.delete(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(200));
        expect((res.json as Sinon.SinonStub).calledWith(carMock.car));
      });
    });

    describe('Failure cases', () => {
      it('should return status 404', async () => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'delete').resolves(null);

        await carController.delete(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(404));
        Sinon.restore()
      });

      it('should return status 400', async () => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'delete').resolves(carMock.car);

        await carController.delete(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(400));
        expect((res.json as Sinon.SinonStub).calledWith({
          error: 'Id must have 24 hexadecimal characters'
        }));
        Sinon.restore()
      });

      it('should return status 500', async () => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'delete').throws();

        await carController.delete(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(500));
        Sinon.restore()
      });
    });
  });
});
