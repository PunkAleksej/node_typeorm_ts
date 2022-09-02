import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  booksQuantity: number;

  @ManyToOne(() => Book, (Book) => Book.cart, {
    nullable: false,
  })
  Book: Book;

  @ManyToOne(() => User, (User) => User.cart, {
    nullable: false,
  })
  @JoinColumn()
  User: User;
}
