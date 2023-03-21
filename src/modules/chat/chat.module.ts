import { Module } from '@nestjs/common';
import { MessageModule } from '../../@core/modules/message';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [MessageModule],
  providers: [ChatGateway],
})
export class ChatModule {}
