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
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lastName: string;

  @Column({
    length: 150,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    type: 'time without time zone',
    nullable: false,
  })
  DoB: Date;

  @CreateDateColumn({
    type: 'time with time zone',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'time with time zone',
  })
  updateAt: Date;
}
