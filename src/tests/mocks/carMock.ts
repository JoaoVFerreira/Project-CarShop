const carMock = {
  params: {
    model: 'Mini Cooper',
    year: 1961,
    color: 'Preto',
    status: true,
    buyValue: 135000,
    doorsQty: 2,
    seatsQty: 4,
  },
  car: {
    _id: '4edd40c86762e0fb12000089',
    model: 'Mini Cooper',
    year: 1961,
    color: 'Preto',
    status: true,
    buyValue: 135000,
    doorsQty: 2,
    seatsQty: 4,
  },
  read: [
    {
      _id: '4edd40c86762e0fb12000089',
      model: 'Mini Cooper',
      year: 1961,
      color: 'Preto',
      status: true,
      buyValue: 135000,
      doorsQty: 2,
      seatsQty: 4,
    },
    {
      _id: '4edd40c86762e0fb12000042',
      model: 'Mustang',
      year: 1986,
      color: 'Azul',
      status: true,
      buyValue: 500000,
      doorsQty: 2,
      seatsQty: 2,
    }
  ],
  update: {
      _id: '4edd40c86762e0fb12000042',
      model: 'Porsche',
      year: 2012,
      color: 'Verde Fosco',
      status: true,
      buyValue: 250000000,
      doorsQty: 2,
      seatsQty: 2,
  },
  invalid: {
    model: 'GY',
    year: 2042,
    color: 'red',
    buyValue: 12000,
    seatsQty: 6,
    doorsQty: 4,
  },
  zodError: {
    error: {
      issues: [
        {
          code: 'too_small',
          minimum: 3,
          type: 'string',
          inclusive: true,
          message: 'model must have more than 3 characters',
          path: [
            'model'
          ]
        }
      ],
      name: 'ZodError'
    }
  }
};

export default carMock;