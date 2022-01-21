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
      name: 'Curitiba',
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

    response = await request(app).post('/api/v1/clients').send(mockClient);

    response = await request(app).delete(`/api/v1/clients/${response.body.id}`);

    expect(response.status).toBe(204);
  });

  test('should return status code equal to 404', async () => {
    const mockWrongClientId = '152c7d29-61c5-4c0c-a149-65229071eb78';

    const response = await request(app).delete(`/api/v1/clients/${mockWrongClientId}`);

    expect(response.status).toBe(404);
  });
});
