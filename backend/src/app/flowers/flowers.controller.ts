import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/core/auth/guards/jwt.guard';
import { FlowersService } from './flowers.service';
import { CurrentUser } from 'src/core/auth/decorators/currentUser.decorator';
import { Flower } from './entities/flower.entity';

@UseGuards(JwtGuard) //
@Controller('garden')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Get('flowers')
  getAllFlowers(@CurrentUser() id: number): Promise<Flower[]> {
    return this.flowersService.allFlowers(id);
  }

  @Post('newFlower')
  addNewFlower(
    @CurrentUser() id: number,
    @Body('x') x: number,
    @Body('y') y: number,
  ): Promise<Flower> {
    return this.flowersService.plantFlower(id, x, y);
  }
}
