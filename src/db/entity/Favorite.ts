import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (Book) => Book.favorite, {
    nullable: false,
  })
  Book: Book;

  @ManyToOne(() => User, (User) => User.favorite, {
    nullable: false,
  })
  @JoinColumn()
  User: User;
}
