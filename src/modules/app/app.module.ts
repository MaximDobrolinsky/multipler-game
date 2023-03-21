import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from '../../@core/modules/user';
import { GameModule } from '../../@core/modules/game';
import { ChatModule } from '../chat';
import { MessageModule } from '../../@core/modules/message';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    GameModule,
    UserModule,
    MessageModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
