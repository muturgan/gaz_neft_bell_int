import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { Author } from '../entities';
import { AddAuthorInput } from '../input_validators';
import { parseGqlQuery } from '../utils';
import type { TGetAuthorsQuery, ICtx } from '../custom_types';


@Resolver(Author)
export class AuthorResolver
{
   @Query(() => [Author])
   public getAuthors(@Ctx() ctx: ICtx): Promise<Author[]>
   {
      const query = parseGqlQuery<TGetAuthorsQuery>(ctx);
      return Author.getAuthors(query);
   }


   @Mutation(() => Author)
   public async addAuthor(@Arg('input', () => AddAuthorInput) input: AddAuthorInput): Promise<Author>
   {
      const author = await Author.create(input).save();
      return author;
   }
}