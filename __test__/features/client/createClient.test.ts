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

describe('src :: api :: controllers :: client :: create', () => {
  test('should create a client', async () => {
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

    const { body } = response;

    expect(response.status).toBe(201);
    expect(body.id).toBeDefined();
    expect(body.name).toBe('Pedro Geromel');
    expect(body.gender).toBe('M');
    expect(body.birthdate).toBe('21/09/1985');
    expect(body.age).toBeDefined();
    expect(body.cityId).toBe(id);
  });

  test('should not create a client', async () => {
    const mockCity = {
      name: 'São Paulo',
      state: 'SP'
    };

    let response = await request(app).post('/api/v1/cities').send(mockCity);

    const { id } = await response.body;

    const mockClient01 = {
      name: 'Pedro Geromel',
      gender: 'M',
      birthdate: '21/09/1985',
      cityId: id
    };

    const mockClient02 = {
      name: 'Pedro Geromel',
      gender: 'M',
      birthdate: '21/09/1985',
      cityId: id
    };

    await request(app).post('/api/v1/clients').send(mockClient01);
    response = await request(app).post('/api/v1/clients').send(mockClient02);

    expect(response.status).toBe(400);
  });
});
