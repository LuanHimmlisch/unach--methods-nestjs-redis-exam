import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './dto/create-user.dto';

@Controller('')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/register')
    async createRegistro(@Body() request: CreateUser) {
        if (!request) {
            return;
        }


        const createdUser = await this.userService.create(request.email, request.password);
        this.userService.notifyNewUser(createdUser);

        return createdUser;
    }
}
