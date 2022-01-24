import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../../../src/app/app';
import connection from '../../../src/infra/database';

beforeAll(async () => {
  await connection();
});

// Erase database:
afterAll(async () => {
  const entities = getConnection(process.env.CONNECTION_NAME).entityMetadatas;
  for (const entity of entities) {
    const repository = getConnection(process.env.CONNECTION_NAME).getRepository(entity.name);
    await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
  }
});

describe('src :: api :: controllers :: client :: update', () => {
  test('should update a client', async () => {
    const mockCity = {
      name: 'Campinas',
      state: 'SP'
    };

    let response = await request(app).post('/api/v1/cities').send(mockCity);

    const { id } = await response.body;

    const mockClient = {
      name: 'Paulo Miranda',
      gender: 'M',
      birthdate: '21/09/1985',
      cityId: id
    };

    response = await request(app).post('/api/v1/clients').send(mockClient);

    const mockUpdatedClientName = 'Walter Kannemann';

    response = await request(app).put(`/api/v1/clients/${response.body.id}`).send({ name: mockUpdatedClientName });

    expect(response.status).toBe(200);
  });

  test('should not update a client', async () => {
    const mockCity = {
      name: 'São Paulo',
      state: 'SP'
    };

    let response = await request(app).post('/api/v1/cities').send(mockCity);

    const { id } = await response.body;

    const mockClient = {
      name: 'Pedro Geromel',
      gender: 'M',
      birthdate: '21/09/1985',
      cityId: id
    };

    response = await request(app).post('/api/v1/clients').send(mockClient);

    const mockUpdatedClientName = 'Walter Kannemann';
    const mockWrongClientId = '152c7d29-61c5-4c0c-a149-65229071eb78';

    response = await request(app).put(`/api/v1/clients/${mockWrongClientId}`).send({ name: mockUpdatedClientName });

    expect(response.status).toBe(400);
  });

  test('should not update a client', async () => {
    const mockCity = {
      name: 'São Paulo',
      state: 'SP'
    };

    let response = await request(app).post('/api/v1/cities').send(mockCity);

    const { id } = await response.body;

    const mockClient = {
      name: 'Pedro Geromel',
      gender: 'M',
      birthdate: '21/09/1985',
      cityId: id
    };

    response = await request(app).post('/api/v1/clients').send(mockClient);

    const mockUpdatedClientName = '';
    const mockClientId = response.body.id;

    response = await request(app).put(`/api/v1/clients/${mockClientId}`).send({ name: mockUpdatedClientName });

    expect(response.status).toBe(400);
  });
});
