import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { MessageDto } from './dtos/message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepo: Repository<Message>,
  ) {}

  //metode
  async addNewMessage(
    msgDto: MessageDto,
    userId: number,
  ): Promise<{ id: number; text: string }> {
    const existingMsg = await this.messagesRepo.findOne({
      where: {
        text: msgDto.text,
        user: { id: userId },
      },
    });
    if (existingMsg) {
      throw new ConflictException('This user already has this message'); //409
    }
    const message: Message = this.messagesRepo.create({
      text: msgDto.text,
      user: { id: userId },
    });
    const savedMessage = await this.messagesRepo.save(message);
    return { id: savedMessage.id, text: msgDto.text };
  }

  async getAllMessages(userId: number): Promise<Message[]> {
    return this.messagesRepo.find({
      where: {
        user: { id: userId },
      },
      order: {
        text: 'ASC',
      },
    });
  }
}
