import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayloadType } from '../types/types';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'BC^)(*843nfU',
        });
    }

    async validate(payload: JwtPayloadType) {
        const user = await this.authService.findById(payload.id)
        if(!user) throw new UnauthorizedException('JWT token readonly');
        return { id: user.id, name: user.name };
    }
}