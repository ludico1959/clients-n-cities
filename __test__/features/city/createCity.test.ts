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

  test('should return status code equal to 400', async () => {
    const mockCity01 = {
      name: 'Rio Branco',
      state: 'AC'
    };

    await request(app).post('/api/v1/cities').send(mockCity01);

    const mockCity02 = {
      name: 'Rio Branco',
      state: 'AC'
    };

    const response = await request(app).post('/api/v1/cities').send(mockCity02);

    expect(response.status).toBe(400);
  });
  test('should return status code equal to 400', async () => {
    const mockCity = {
      name: 'Goiânia',
      state: 'GG'
    };

    await request(app).post('/api/v1/cities').send(mockCity);

    const response = await request(app).post('/api/v1/cities').send(mockCity);

    expect(response.status).toBe(400);
  });
});
