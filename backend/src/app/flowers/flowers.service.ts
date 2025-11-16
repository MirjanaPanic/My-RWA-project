import { Injectable } from '@nestjs/common';
import { Flower } from './entities/flower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FlowersService {
  constructor(
    @InjectRepository(Flower) private flowersRepo: Repository<Flower>,
  ) {}

  //number of done and early done sessions
  async allFlowers(id: number): Promise<Flower[]> {
    return await this.flowersRepo.find({
      where: { user: { id } },
    });
  }

  async plantFlower(id: number, x: number, y: number): Promise<Flower> {
    const newFlower = this.flowersRepo.create({ user: { id: id }, x: x, y: y });
    return await this.flowersRepo.save(newFlower);
  }
}
