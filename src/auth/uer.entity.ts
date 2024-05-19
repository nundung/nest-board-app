import { BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}
