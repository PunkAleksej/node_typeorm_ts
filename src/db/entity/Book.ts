import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Genre } from './Genre';
import { Rating } from './Rating';
import { Author } from './Author';

@Entity()
export class Book {
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
  description: string;

  @Column({
    nullable: true,
  })
  price: number;

  @Column({
    nullable: true,
  })
  paperPrice: number;

  @CreateDateColumn({
    select: false,
  })
  releasedAt: Date;

  @Column({
    nullable: true,
  })
  cover: string;

  @OneToMany(() => Rating, (Rating) => Rating.Book, {
    cascade: true,
  })
  @JoinColumn()
  rating: Rating[];

  @ManyToOne(() => Author, (Author) => Author.books, {
    cascade: true,
  })
  @JoinColumn()
  author: Author;

  @ManyToMany(() => Genre, (Genre) => Genre.books, {
    cascade: true,
  })
  @JoinTable()
  genres: Genre[];

  // @AfterLoad()
  // addDataForCover() {
  //   if (this.cover === '') {
  //     return;
  //   }
  //   this.cover = `http://localhost:4000/static/${this.cover}`;
  // }
}
