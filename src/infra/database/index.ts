import { createConnection } from 'typeorm';

// createConnection();
export const connection = async () => {
  await createConnection(process.env.CONNECTION_NAME);
};
