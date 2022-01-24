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

describe('src :: api :: controllers :: city :: find', () => {
  test('should return a list of cities from some state', async () => {
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

    const response = await request(app).get('/api/v1/cities/').query({ state: mockState });

    const { body } = response;

    expect(response.status).toBe(200);
    body.result.forEach((city: { state: string }) => expect(city.state).toBe(mockState));
  });

  test('should return an error because there are no cities in the state', async () => {
    const mockState = 'RS';

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

    const response = await request(app).get(`/api/v1/cities`).query({ state: mockState });

    expect(response.status).toBe(404);
  });

  test('should return an error because the state is invalid', async () => {
    const mockCityState = 'AA';

    const mockCity = {
      name: 'Cuiabá',
      state: 'MT'
    };

    await request(app).post('/api/v1/cities').send(mockCity);

    const response = await request(app).get(`/api/v1/cities`).query({ state: mockCityState });

    expect(response.status).toBe(400);
  });
});
