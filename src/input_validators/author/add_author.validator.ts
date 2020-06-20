import { Length, IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AddAuthorInput
{
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(1, 16)
  public readonly name!: string;
}