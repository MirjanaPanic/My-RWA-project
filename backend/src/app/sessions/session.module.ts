import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsController } from './session.controller';
import { SessionsService } from './session.service';
import { Session } from './entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  controllers: [SessionsController],
  providers: [SessionsService], //UNUTAR MODULA - registruje servise koje taj modul koristi
  exports: [SessionsService],
})
export class SessionsModule {}
