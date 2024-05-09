import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @Inject('EVENT_CHANNEL')
        private client: ClientProxy
    ) { }

    async create(email: string, password: string): Promise<User> {
        const user = this.userRepository.create({ email, password });
        const response = await this.userRepository.save(user);

        return response;
    }

    async exists(email: string): Promise<boolean> {
        return await this.userRepository.exists({ where: { email: email } });
    }

    notifyNewUser(user: User): Observable<any> {
        return this.client.emit('new_user', user);
    }
}
