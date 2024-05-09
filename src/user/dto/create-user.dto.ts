import { IsNotEmpty, IsString, IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUser {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    @IsString()
    password: string;
}