import { Entity, Column, PrimaryColumn } from 'typeorm';
import { randomUUID } from 'crypto';

@Entity('cities')
export class City {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  state: string;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
