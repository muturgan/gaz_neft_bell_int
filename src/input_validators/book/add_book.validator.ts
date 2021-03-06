import { Length, IsString, IsNotEmpty, IsInt, IsPositive } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import { integer } from '../../custom_types';

@InputType()
export class AddBookInput
{
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(1, 34)
  public readonly name!: string;


  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public readonly pageCount!: integer;


  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public readonly authorId!: integer;
}