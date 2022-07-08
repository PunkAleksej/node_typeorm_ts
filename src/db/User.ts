import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    firstName: string;

  @Column()
    lastName: string;

  @Column({
    length: 150,
    unique: true,
  })
  email: string;

  @Column()
    password: string;
}
