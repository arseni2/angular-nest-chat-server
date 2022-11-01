import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: "*",
  }
})
export class MessageGateway {
  constructor(
      private readonly messageService: MessageService
  ) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  async create(socket: Socket, createMessageDto: CreateMessageDto) {
    const token = socket.handshake.headers.authorization
    const data = await this.messageService.create(createMessageDto, token)
    console.log(data)
    this.server.emit('recMessage', data)
  }

  @SubscribeMessage('findAllMessage')
  findAll() {
    return this.messageService.findAll();
  }
}
