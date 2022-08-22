import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Book, (Book) => Book.id, {
    nullable: true,
  })
  book: Book;

  @OneToOne(() => User, (User) => User.id, {
    nullable: true,
  })
  user: User;
}
