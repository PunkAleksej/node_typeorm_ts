import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'time with time zone',
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'time with time zone',
    select: false,
  })
  updatedAt: Date;

  @Column({
    nullable: false,
    type: 'int',
  })
  bookRating: number;

  @ManyToOne(() => Book, (Book) => Book.id, {
    nullable: false,
  })
  BookId: Book['id'];

  @ManyToOne(() => User, (User) => User.id, {
    nullable: false,
  })
  UserId: User['id'];
}
