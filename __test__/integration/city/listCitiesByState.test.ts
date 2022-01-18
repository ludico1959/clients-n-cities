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

describe('src :: api :: controllers :: city :: create', () => {
  test('should return a list of cities from a state and must have a pagination', async () => {
    const mockState = 'MT';

    const mockCity01 = {
      name: 'Cuiabá',
      state: 'MT'
    };

    const mockCity02 = {
      name: 'Lucas do Rio Verde',
      state: 'MT'
    };

    await request(app).post('/api/v1/cities').send(mockCity01);
    await request(app).post('/api/v1/cities').send(mockCity02);

    const response = await request(app).get(`/api/v1/cities/state/${mockState}`);

    const { body } = response;

    expect(response.status).toBe(200);
    body.data.cities.forEach((city: { state: any }) => expect(city.state).toBe(mockState));
  });
});
