import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [TagsService], //UNUTAR MODULA - registruje servise koje taj modul koristi
  exports: [TagsService],
})
export class TagsModule {}
