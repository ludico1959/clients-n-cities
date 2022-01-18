import { getConnectionOptions, createConnection } from 'typeorm';

const connection = async () => {
  const connectionOptions = await getConnectionOptions(process.env.CONNECTION_NAME);
  return createConnection(connectionOptions);
};

export default connection;
