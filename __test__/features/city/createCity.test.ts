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
  test('should create a city', async () => {
    const mockCity = {
      name: 'Acrelândia',
      state: 'AC'
    };

    const response = await request(app).post('/api/v1/cities').send(mockCity);

    const { body } = response;

    expect(response.status).toBe(201);
    expect(body.id).toBeDefined();
    expect(body.name).toBe('Acrelândia');
    expect(body.state).toBe('AC');
  });

  test('should not create a city', async () => {
    const mockCity = {
      name: 'Acrelândia',
      state: 'AA'
    };

    const response = await request(app).post('/api/v1/cities').send(mockCity);

    expect(response.status).toBe(400);
  });
});