import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Types } from 'mongoose';
import { Server, Socket } from 'socket.io';

import { CreateMessageDto, MessageService } from '../../@core/modules/message';

@WebSocketGateway(parseInt(process.env.PORT_SOCKET) | 3030, {
  namespace: 'chat',
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: any): Promise<void> {
    const parsedPayload = JSON.parse(payload);

    const messageDto: CreateMessageDto = {
      text: parsedPayload.message,
      player: new Types.ObjectId(parsedPayload.playerId),
      game: new Types.ObjectId(parsedPayload.gameId),
    };

    const createdMesage = await this.messageService.create(messageDto);
    const message = await this.messageService.getById(createdMesage._id);
    this.server.emit('reveiveMessage', message);
  }
}
