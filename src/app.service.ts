import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Intents, TextChannel } from 'discord.js';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  private client: Client;

  async onModuleInit() {
    await this.login();
  }

  async postMessageToChannel(channelId: string, message: any) {
    const channel = (await this.client.channels.fetch(
      channelId,
    )) as TextChannel;

    await channel.send(message);
  }

  async postMessageToUser(userId: string, message: any) {
    const user = await this.client.users.fetch(userId);

    if (!!message.embeds && !Array.isArray(message.embeds)) {
      message.embeds = [message.embeds];
    }

    await user.send(message);
  }

  async login() {
    const token = this.configService.get<string>('DISCORD_TOKEN');

    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });

    await this.client.login(token);
  }
}
