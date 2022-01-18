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

    const { id } = await cityResponse.body.data.createdCity;

    const mockClient = {
      name: 'Pedro Geromel',
      gender: 'M',
      birthdate: '1985-09-21',
      cityId: id
    };

    response = await request(app).post('/api/v1/clients').send(mockClient);

    const { body } = response;

    expect(response.status).toBe(201);
    expect(body.data.createdClient.id).toBeDefined();
    expect(body.data.createdClient.name).toBe('Pedro Geromel');
    expect(body.data.createdClient.gender).toBe('M');
    expect(body.data.createdClient.birthdate).toBe('21/09/1985');
    expect(body.data.createdClient.age).toBeDefined();
    expect(body.data.createdClient.cityId).toBe(id);
  });
});
