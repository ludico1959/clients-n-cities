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
  test('should return a client by its ID', async () => {
    const mockCity = {
      name: 'São Paulo',
      state: 'SP'
    };

    let response = await request(app).post('/api/v1/cities').send(mockCity);

    const { id } = await response.body.data.createdCity;

    const mockClient = {
      name: 'Geromel',
      gender: 'M',
      birthdate: '21/09/1985',
      cityId: id
    };

    response = await request(app).post('/api/v1/clients').send(mockClient);

    const mockClientId = await response.body.data.createdClient.id;

    response = await request(app).get(`/api/v1/clients/${mockClientId}`).query({ id: mockClientId });

    const { body } = response;

    expect(response.status).toBe(200);
    expect(body.data.client.id).toBe(mockClientId);
  });

  test('should not return a client by its ID', async () => {
    const mockCity = {
      name: 'São Paulo',
      state: 'SP'
    };

    let response = await request(app).post('/api/v1/cities').send(mockCity);

    const { id } = await response.body.data.createdCity;

    const mockClient = {
      name: 'Geromel',
      gender: 'M',
      birthdate: '21/09/1985',
      cityId: id
    };

    response = await request(app).post('/api/v1/clients').send(mockClient);

    const mockClientId = '';

    response = await request(app).get(`/api/v1/clients/${mockClientId}`).query({ id: mockClientId });

    expect(response.status).toBe(404);
  });
});
