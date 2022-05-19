import { Body, Controller, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/message/channel/:channelId')
  async postMessageToChannel(
    @Param('channelId') channelId: string,
    @Body() message: any,
  ) {
    await this.appService.postMessageToChannel(channelId, message);
  }

  @Post('/message/user/:userId')
  async postMessageToUser(
    @Param('userId') userId: string,
    @Body() message: any,
  ) {
    await this.appService.postMessageToUser(userId, message);
  }
}
