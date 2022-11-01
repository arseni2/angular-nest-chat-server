import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType } from './types/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {
    }

    async create(createAuthDto: CreateAuthDto) {
        try {
            let user = await this.repository.create(createAuthDto)
            user = await this.repository.save(user)
            const {password, ...userData} = user
            const payload: JwtPayloadType = {id: user.id, name: user.name}
            const token = this.jwtService.sign(payload)
            return {
                ...userData,
                token
            }
        } catch (e) {
            throw new BadRequestException('name must be unique')
        }
    }

    findOne(name: string) {
        return this.repository.findOneBy({ name });
    }

    findById(id: number) {
        return this.repository.findOneBy({id});
    }

    async validateUser(name: string, pass: string): Promise<Pick<UserEntity, "id" | "name">> {
        const user = await this.findOne(name);
        if(!user) throw new UnauthorizedException('login or pass not correct')
        const isPassMatch = await bcrypt.compare(pass, user.password);
        if (isPassMatch) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('login or pass not correct');;
    }

    generateJwtToken(data: { id: number; name: string }) {
        const payload = { email: data.name, sub: data.id };
        return this.jwtService.sign(payload);
    }

    async login(user: UserEntity) {
        if(!user) throw new UnauthorizedException('login or pass not correct')
        const { password, ...userData } = user;
        return {
            ...userData,
            token: this.generateJwtToken(userData),
        };
    }

}
