import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    type: 'varchar',
  })
    firstName: string;

  @Column({
    type: 'varchar',
  })
    lastName: string;

  @Column({
    length: 150,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
    password: string;

  @CreateDateColumn()
    createAt: Date;

  @UpdateDateColumn()
    updateAt: Date;
}
