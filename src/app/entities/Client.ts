import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { randomUUID } from 'crypto';
import { City } from './City';

@Entity('clients')
export class Client {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  gender!: string;

  @Column()
  birthdate!: string;

  @Column()
  cityId!: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'cityId' })
  city!: City;

  age: number;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
