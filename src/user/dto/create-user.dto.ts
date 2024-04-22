import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUser {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}