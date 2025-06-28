import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private service: MessagesService) {}

  @Post()
  create(@Body() body: {
    name?: string;
    email?: string;
    type: string;
    content: string;
  }) {
    return this.service.create(body);
  }
}
