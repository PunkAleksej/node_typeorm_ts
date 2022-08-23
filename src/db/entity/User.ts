import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
  JoinTable,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Rating } from './Rating';
import { Photo } from './Photo';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  photo: string;

  @Column({
    length: 150,
    unique: false,
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

  @OneToOne(() => Photo, (Photo) => Photo.user, {
    nullable: false,
  })
  userPhoto: Photo;

  @OneToMany(() => Rating, (User) => User.id, {
    cascade: true,
  })
  @JoinTable()
  rating: Rating[];

  @AfterLoad()
  addDataForPhoto() {
    if (this.photo !== null) {
      this.photo = `http://localhost:4000/static/${this.photo}`;
    }
  }
}
