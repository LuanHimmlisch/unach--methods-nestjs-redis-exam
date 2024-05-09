import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Req } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        // @ts-ignore
        const auth = !!request.session.user;

        return auth;
    }
}
