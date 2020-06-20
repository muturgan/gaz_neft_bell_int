import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import { integer } from '../../custom_types';

@InputType()
export class DeleteBookInput
{
   @Field(() => Int)
   @IsNotEmpty()
   @IsInt()
   @IsPositive()
   public readonly bookId!: integer;
}