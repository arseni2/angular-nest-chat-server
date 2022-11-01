import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from '../auth/entities/auth.entity';

@Module({
  providers: [MessageGateway, MessageService, JwtService, AuthService],
  imports: [TypeOrmModule.forFeature([MessageEntity, UserEntity])]
})
export class MessageModule {}
