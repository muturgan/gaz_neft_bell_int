import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Book } from './book.entity';
import type { IAuthor } from '../custom_types';


@Entity('authors')
export class Author extends BaseEntity implements IAuthor
{
   @PrimaryGeneratedColumn()
   public authorId!: number;

   @Column()
   public name!: string;


   @OneToMany(() => Book, (book) => book.author)
   public books!: Book[];
}
