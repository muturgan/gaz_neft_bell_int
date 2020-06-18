import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';
import { Author } from './author.entity';
import type { IBook } from '../custom_types';


@Entity('books')
export class Book extends BaseEntity implements IBook
{
   @PrimaryGeneratedColumn()
   public bookId!: number;

   @Column()
   public name!: string;

   @Column()
   public pageCount!: number;

   @Column()
   public authorId!: number;



   @ManyToOne(() => Author, (author) => author.authorId)
   @JoinColumn({ name: 'authorId' })
   public author!: Author;
}
