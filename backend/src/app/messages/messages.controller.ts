import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/core/auth/guards/jwt.guard';
import { MessagesService } from './messages.service';
import { MessageDto } from './dtos/message.dto';
import { CurrentUser } from 'src/core/auth/decorators/currentUser.decorator';
import { Message } from './entities/message.entity';

@UseGuards(JwtGuard) //
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  //metode
  @Post('new')
  create(@Body() msgDto: MessageDto, @CurrentUser() userId: number) {
    return this.messagesService.addNewMessage(msgDto, userId);
  }

  @Get('all')
  allMessages(@CurrentUser() userId: number): Promise<Message[]> {
    return this.messagesService.getAllMessages(userId);
  }

  @Put('update/:id')
  update(
    @Param('id') id: number,
    @Body() mesaageDto: MessageDto,
    @CurrentUser() userId: number,
  ) {
    return this.messagesService.updateMessage(id, mesaageDto, userId);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number, @CurrentUser() userId: number) {
    return this.messagesService.deleteMessage(id, userId);
  }
}
