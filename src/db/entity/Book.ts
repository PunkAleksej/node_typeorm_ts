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
  BeforeUpdate,
  AfterLoad,
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
    select: true,
  })
  releasedAt: Date;

  @Column({
    nullable: true,
  })
  cover: string;

  @Column({
    nullable: true,
  })
  middleRating: number;

  @OneToMany(() => Rating, (Rating) => Rating.Book, {
    cascade: true,
    eager: true,
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

  @AfterLoad()
  addDataForCover() {
    if (this.cover === '') {
      return;
    }
    this.cover = `http://localhost:4000/book-static/${this.cover}`;
  }
  
  @AfterLoad()
  addDataForMiddleRating() {
    if (!this.rating.length) {
      this.middleRating = 0;
      return;
    }
    let ratingSum = 0;
    const RatingList = [];
    this.rating.forEach((elem) => {
      RatingList.push(elem.bookRating);
      ratingSum += elem.bookRating;
    });
    this.middleRating = ratingSum / RatingList.length;
  }
}
