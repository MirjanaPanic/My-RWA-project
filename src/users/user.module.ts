import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService], //UNUTAR MODULA - registruje servise koje taj modul koristi
  exports: [UsersService], //VAN MODULA da mogu da ga koriste
})
export class UsersModule {}
