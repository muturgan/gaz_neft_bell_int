import { Resolver, Query } from 'type-graphql';

@Resolver()
export class HelloResolver {
   @Query(() => String)
   public helloWorld() {
      return 'Hello World!';
   }
}