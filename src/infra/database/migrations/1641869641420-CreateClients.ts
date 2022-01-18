import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClients1641869641420 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'gender',
            type: 'varchar'
          },
          {
            name: 'birthdate',
            type: 'varchar'
          },
          {
            name: 'age',
            type: 'integer'
          },
          {
            name: 'cityId',
            type: 'uuid'
          }
        ],
        foreignKeys: [
          {
            name: 'fk_client_city',
            columnNames: ['cityId'],
            referencedTableName: 'cities',
            referencedColumnNames: ['id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }
}
