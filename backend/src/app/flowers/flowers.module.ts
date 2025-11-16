import { Module } from '@nestjs/common';
import { Flower } from './entities/flower.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowersController } from './flowers.controller';
import { FlowersService } from './flowers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Flower])],
  controllers: [FlowersController],
  providers: [FlowersService],
  exports: [FlowersService],
})
export class FlowersModule {}
