import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
  ManyToMany,
  ManyToOne,
  JoinTable,
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

  @ManyToOne(() => Author, (Author) => Author.id, {
    cascade: true,
  })

  @Column({
    type: 'varchar',
    nullable: true,
  })
  author: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @ManyToMany(() => Rating, (Rating) => Rating.id, {
    cascade: true,
  })

  @Column({
    type: 'varchar',
    nullable: true,
  })
  rating: string;

  @Column({
    nullable: true,
    type: 'int',
  })
  price: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  paperPrice: number;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  cover: string;

  @ManyToMany(() => Genre, (Genre) => Genre.id, {
    cascade: true,
  })
  @JoinTable()
  genres: Genre[];

  @AfterLoad()
  addDataForCover() {
    if (this.cover === '') {
      return;
    }
    this.cover = `http://localhost:4000/static/${this.cover}`;
  }

  @CreateDateColumn({
    type: 'time with time zone',
    select: false,
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'time with time zone',
    select: false,
  })
  updateAt: Date;
}
