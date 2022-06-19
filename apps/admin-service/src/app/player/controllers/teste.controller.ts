import {
  Controller,
  Get,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('teste')
export class TesteController {
  constructor(@Inject('GREETING_SERVICE') private client: ClientProxy){}

  @Get('hello')
  async getHello(){
    return this.client.send({cmd: 'greeting'}, 'Progressive Coder');
  }

  @Get('hello2')
  async getHelloAsync() {
    const message = await this.client.send({cmd: 'greeting-async'}, 'Progressive Coder');
    return message;
  }

  @Get('hello3')
  async publishEvent() {
    this.client.emit('book-created', {'bookName': 'The Way Of Kings', 'author': 'Brandon Sanderson'});
  }
}
