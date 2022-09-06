import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  AfterLoad,
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

  @Column({
    nullable: false,
    type: 'int',
  })
  bookId: number;

  @ManyToOne(() => Book, (Book) => Book.cart, {
    nullable: false,
  })
  Book: Book;

  @ManyToOne(() => User, (User) => User.cart, {
    nullable: false,
  })
  @JoinColumn()
  User: User;

  addDataForCover() {
    this.bookId = this.Book.id;
  }
}
