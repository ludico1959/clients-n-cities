import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { brazilianUF } from '../../../app/utils/enumStates';

export class CreateCities1641869624287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cities',
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
            name: 'state',
            type: 'varchar',
            enum: Object.keys(brazilianUF)
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cities');
  }
}
