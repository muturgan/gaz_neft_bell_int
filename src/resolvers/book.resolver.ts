import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { Book } from '../entities';
import { AddBookInput, DeleteBookInput } from '../input_validators';
import { parseGqlQuery } from '../utils';
import type { TGetBooksQuery, ICtx } from '../custom_types';


@Resolver(Book)
export class BookResolver
{
   @Query(() => [Book])
   public getBooks(@Ctx() ctx: ICtx): Promise<Book[]>
   {
      const query = parseGqlQuery<TGetBooksQuery>(ctx);
      return Book.getBooks(query);
   }


   @Mutation(() => Book)
   public async addBook(@Arg('input', () => AddBookInput) input: AddBookInput): Promise<Book>
   {
      const author = await Book.create(input).save();
      return author;
   }


   @Mutation(() => Boolean)
   public deleteBook(@Arg('input', () => DeleteBookInput) input: DeleteBookInput): Promise<boolean>
   {
      return Book.deleteBook(input.bookId);
   }
}