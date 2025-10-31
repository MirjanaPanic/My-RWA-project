import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/app/users/entities/user.entity';
import { Message } from 'src/app/messages/entities/message.entity';
import { Session } from 'src/app/sessions/entities/session.entity';
import { Tag } from 'src/app/tags/entities/tag.entity';
import { Flower } from 'src/app/flowers/entities/flower.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Message, Session, Tag, Flower],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class ConfigDBModule {}
