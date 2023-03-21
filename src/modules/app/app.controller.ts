import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Types } from 'mongoose';
import {
  LoginBodyRequest,
  StartGameRoundBodyRequest,
} from '../../@shared/interfaces/app-request.interface';
import {
  GetAllGameMessagesResponse,
  LoginResponse,
  StartGameRoundResponse,
} from '../../@shared/interfaces/app-response.interface';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  @ApiResponse({ status: 200, type: LoginResponse })
  async login(@Body() body: LoginBodyRequest) {
    const { name } = body;

    const loggedUser = await this.appService.login(name);
    const game = await this.appService.startGame(loggedUser._id);

    return {
      loggedUser,
      game,
    };
  }

  @Post('game/:id/round/start')
  @ApiResponse({ status: 200, type: StartGameRoundResponse })
  async startGameRound(
    @Param('id') gameId: string,
    @Body() body: StartGameRoundBodyRequest,
  ) {
    const { points, multipler } = body;

    return this.appService.processGameRound(
      new Types.ObjectId(gameId),
      points,
      multipler,
    );
  }

  @Get('game/:id/message')
  @ApiResponse({ status: 200, type: [GetAllGameMessagesResponse] })
  async getAllGameMessages(@Param('id') gameId: string) {
    return this.appService.getAllGameMessages(new Types.ObjectId(gameId));
  }
}
