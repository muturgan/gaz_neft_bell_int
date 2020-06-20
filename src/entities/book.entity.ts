import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, ManyToOne, FindManyOptions } from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { Author } from './author.entity';
import type { IBook, integer, TGetBooksQuery } from '../custom_types';


@ObjectType()
@Entity('books')
export class Book extends BaseEntity implements IBook
{
   @Field(() => ID)
   @PrimaryGeneratedColumn({unsigned: true})
   public bookId!: integer;

   @Field()
   @Column({type: 'varchar', length: 34})
   public name!: string;

   @Field(() => Int)
   @Column({type: 'integer', unsigned: true})
   public pageCount!: integer;

   @Field(() => Int)
   @Column({type: 'integer', unsigned: true})
   public authorId!: integer;



   @Field(() => Author)
   @ManyToOne(() => Author, (author) => author.authorId)
   @JoinColumn({ name: 'authorId' })
   public author!: Author;



   public static getBooks(query: TGetBooksQuery): Promise<Book[]>
   {
      const options: FindManyOptions<Book> = {};
      if ('author' in query.getBooks) {
         options.relations = ['author'];
      }

      return Book.find(options);
   }

   public static async deleteBook(bookId: integer): Promise<boolean>
   {
      const result = await Book.delete(bookId);
      return result.affected === 1;
   }
}
