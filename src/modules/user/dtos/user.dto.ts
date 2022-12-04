import { Length, IsString } from "class-validator";
export class CreateUserDto {
  @IsString()
  @Length(2, 6)
  username: string;
  
  @IsString()
  @Length(6, 12)
  password: string;
}