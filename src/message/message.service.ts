import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { JwtDecodeTokenType } from '../auth/types/types';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageEntity)
        private messageRepository: Repository<MessageEntity>,
        private readonly jwtService: JwtService,
        private readonly authService: AuthService
    ) {
    }

    async create(createMessageDto: CreateMessageDto, token: string) {
        const jwtPayload = <JwtDecodeTokenType>this.jwtService.decode(token)
        const user = await this.authService.findOne(jwtPayload.email)
        return this.messageRepository.save({
            message: createMessageDto.message,
            user: user,
        });
    }

    findAll() {
        return this.messageRepository.find();
    }
}
