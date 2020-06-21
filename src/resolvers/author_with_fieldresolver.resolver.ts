import { Resolver, Query, FieldResolver, Root, Ctx } from 'type-graphql';
import { Author, Book } from '../entities';
import type { ICtx } from '../custom_types';
import { parseGqlQuery } from '../utils';


@Resolver(Author)
export class AuthorResolverWithFieldResolver
{
   private _books: Book[] = [];


   // since this is required by the specification...
   @FieldResolver(() => [Book])
   public books(@Root() author: Author): Book[]
   {
      return this._books.filter(b => b.authorId === author.authorId);
   }


   @Query(() => [Author])
   public async getAuthorsWithFieldResolver(@Ctx() ctx: ICtx): Promise<Author[]>
   {
      const query = parseGqlQuery(ctx);

      const promises: Array<Promise<any[]>> = [Author.find()];

      if (query && query.getAuthorsWithFieldResolver && query.getAuthorsWithFieldResolver.books) {
         promises.push(Book.find());
      }

      const [authors, books] = await Promise.all(promises) as [Author[], Book[] | undefined];

      if (books !== undefined) {
         this._books = books;
      }

      return authors;
   }

}