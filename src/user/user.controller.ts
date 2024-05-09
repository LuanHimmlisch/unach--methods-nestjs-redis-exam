import { BadRequestException, Body, Controller, Post, Req, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './dto/create-user.dto';
import { LoginUser } from './dto/login-user';
import { ValidationError } from 'class-validator';

@Controller('')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/register')
    async register(@Body() input: CreateUser) {
        const exists = await this.userService.exists(input.email);

        if (exists) {
            throw new BadRequestException('Email already exists');
        }

        const createdUser = await this.userService.create(input.email, input.password);
        // this.userService.notifyNewUser(createdUser);

        return createdUser;
    }
}
