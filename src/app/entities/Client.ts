import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { City } from "../entities/City";

@Entity('clients')

export class Client {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    gender: string;

    @Column()
    birthdate: Date;

    @Column()
    age: number;

    @Column()
    city_id: string;

    @ManyToOne(() => City)
    @JoinColumn({ name: "city_id" })
    city: City;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}