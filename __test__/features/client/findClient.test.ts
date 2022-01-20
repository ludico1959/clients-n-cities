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

describe('src :: api :: controllers :: city :: listByName', () => {
  test('should return a client by its name', async () => {
    const mockCity = {
      name: 'São Paulo',
      state: 'SP'
    };

    let response = await request(app).post('/api/v1/cities').send(mockCity);

    const { id } = await response.body;

    const mockClient = {
      name: 'Geromel',
      gender: 'M',
      birthdate: '21/09/1985',
      cityId: id
    };

    const mockClientName = 'Geromel';

    await request(app).post('/api/v1/clients').send(mockClient);

    response = await request(app).get(`/api/v1/clients/name/${mockClientName}`).query({ name: mockClientName });

    const { body } = response;

    expect(response.status).toBe(200);
    expect(body.name).toBe(mockClientName);
  });

  test('should not return a client by its name', async () => {
    const mockCity = {
      name: 'São Paulo',
      state: 'SP'
    };

    let response = await request(app).post('/api/v1/cities').send(mockCity);

    const { id } = await response.body;

    const mockClient = {
      name: 'Geromel',
      gender: 'M',
      birthdate: '21/09/1985',
      cityId: id
    };

    const mockClientName = '';

    await request(app).post('/api/v1/clients').send(mockClient);

    response = await request(app).get(`/api/v1/clients/name/${mockClientName}`).query({ name: mockClientName });

    expect(response.status).toBe(404);
  });
});
