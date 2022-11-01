import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserEntity } from '../entities/auth.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({usernameField: 'name'});
    }

    async validate(username: string, password: string): Promise<Pick<UserEntity, "id" | "name">> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('login or pass not correct');
        }
        return user;
    }
}