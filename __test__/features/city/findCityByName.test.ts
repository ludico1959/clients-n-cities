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
  test('should return a city', async () => {
    const mockCityName = 'Chapecó';

    const mockCity = {
      name: 'Chapecó',
      state: 'SC'
    };

    await request(app).post('/api/v1/cities').send(mockCity);

    const response = await request(app).get(`/api/v1/cities/name/${mockCityName}`).query({ name: mockCityName });

    const { body } = response;

    expect(response.status).toBe(200);
    expect(body.name).toBe(mockCityName);
  });

  test('should not return city', async () => {
    const mockCityName = '';

    const mockCity = {
      name: 'Chapecó',
      state: 'SC'
    };

    await request(app).post('/api/v1/cities').send(mockCity);

    const response = await request(app).get(`/api/v1/cities/name/${mockCityName}`).query({ state: mockCityName });

    expect(response.status).toBe(404);
  });
});
