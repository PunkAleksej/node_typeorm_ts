import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (Book) => Book.id, {
    nullable: true,
  })
  book: Book;

  @ManyToOne(() => User, (User) => User.id, {
    nullable: true,
  })
  user: User;
}
