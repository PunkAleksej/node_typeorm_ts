import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  AfterLoad,
  JoinTable,
  OneToOne,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Genre } from './Genre';
import { Rating } from './Rating';
import { Author } from './Author';
import { Photo } from './Photo';

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

  // @OneToOne(() => Photo, (Photo) => Photo.book, {
  //   nullable: false,
  // })
  // cover: Photo;

  @Column({
    nullable: true,
  })
  cover: string;

  @OneToMany(() => Rating, (Rating) => Rating.id, {
    cascade: true
  })
  @JoinTable()
  rating: Rating[];

  @ManyToOne(() => Author, (Author) => Author.books, {
    cascade: true
  })
  @JoinTable()
  author: Author;

  @ManyToMany(() => Genre, (Genre) => Genre.books, {
    cascade: true
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
