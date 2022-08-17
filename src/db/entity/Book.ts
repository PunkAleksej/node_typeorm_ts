import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  author: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  photo: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  text: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  rating: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  price: string;

  @Column({
    type: 'time without time zone',
    nullable: true,
    select: false,
  })
  DoB: Date;

  @CreateDateColumn({
    type: 'time with time zone',
    select: false,
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'time with time zone',
    select: false,
  })
  updateAt: Date;

  @AfterLoad()
  addDataForPhoto() {
    if (this.photo !== null) {
      this.photo = `http://localhost:4000/static/${this.photo}`;
    }
  }
}
