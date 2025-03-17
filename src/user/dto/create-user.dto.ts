import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}