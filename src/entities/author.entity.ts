import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, FindManyOptions } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Book } from './book.entity';
import type { IAuthor, integer, TGetAuthorsQuery } from '../custom_types';


@ObjectType()
@Entity('authors')
export class Author extends BaseEntity implements IAuthor
{
   @Field(() => ID)
   @PrimaryGeneratedColumn({unsigned: true})
   public authorId!: integer;

   @Field()
   @Column({type: 'varchar', length: 32, unique: true})
   public name!: string;


   @Field(() => [Book])
   @OneToMany(() => Book, (book) => book.author)
   public books!: Book[];


   public static getAuthors(query: TGetAuthorsQuery): Promise<Author[]>
   {
      const options: FindManyOptions<Author> = {};
      if ('books' in query.getAuthors) {
         options.relations = ['books'];
      }

      return Author.find(options);
   }
}
