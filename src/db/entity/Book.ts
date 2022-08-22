import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  AfterLoad,
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

  // @OneToMany(() => Photo, (Photo) => Photo.book, {
  //   nullable: false,
  // })
  // cover: Photo;

  @Column({
    nullable: true,
  })
  cover: string;

  @OneToMany(() => Rating, (Rating) => Rating.id, {
  })
  rating: Rating[];

  @OneToMany(() => Author, (Author) => Author.id, {
  })
  author: Author['name'];

  @ManyToMany(() => Genre, (Genre) => Genre.id, {
  })
  genres: Genre[];

  // @AfterLoad()
  // addDataForCover() {
  //   if (this.cover === '') {
  //     return;
  //   }
  //   this.cover = `http://localhost:4000/static/${this.cover}`;
  // }
}
