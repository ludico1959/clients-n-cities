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

describe('src :: api :: controllers :: city :: delete', () => {
  test('should delete a client by its ID', async () => {
    const mockCity = {
      name: 'Londrina',
      state: 'PR'
    };

    let response = await request(app).post('/api/v1/cities').send(mockCity);

    const { id } = await response.body;

    const mockClient = {
      name: 'Diego Sousa',
      gender: 'M',
      birthdate: '21/09/1985',
      cityId: id
    };

    const mockClientId = await response.body.id;

    response = await request(app).post('/api/v1/clients').send(mockClient);

    response = await request(app).delete(`/api/v1/clients/${mockClientId}`).query({ id: mockClientId });

    expect(response.status).toBe(204);
  });

  test('should return status code equal to 400', async () => {
    const mockCity = {
      name: 'Porto Alegre',
      state: 'RS'
    };

    let response = await request(app).post('/api/v1/cities').send(mockCity);

    const { id } = await response.body;

    const mockClient = {
      name: 'Douglas Costa',
      gender: 'M',
      birthdate: '01/01/1985',
      cityId: id
    };

    await request(app).post('/api/v1/clients').send(mockClient);

    const mockWrongClientId = '152c7d29-61c5-4c0c-a149-65229071eb78';

    response = await request(app).get(`/api/v1/clients/${mockWrongClientId}`).query({ id: mockWrongClientId });

    expect(response.status).toBe(404);
  });
});
