import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { TagDto } from './dtos/tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagsRepo: Repository<Tag>) {}

  async addNewTag(tagDto: TagDto, userId: number): Promise<Tag> {
    const existingTag = await this.tagsRepo.findOne({
      where: {
        name: tagDto.name,
        user: { id: userId },
      },
    });
    if (existingTag) {
      throw new Error('This user already has this tag');
    }
    const tag: Tag = this.tagsRepo.create({
      name: tagDto.name,
      user: { id: userId },
    });
    return this.tagsRepo.save(tag);
  }

  //delete tag
  async deleteTag(id: number, userId: number) {
    const tag = await this.tagsRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!tag) {
      throw new Error('Tag not found');
    }
    await this.tagsRepo.remove(tag); //status 200 ako je uspesno obrisan
  }

  //all tags
  async getAllTags(userId: number): Promise<Tag[]> {
    return this.tagsRepo.find({
      where: {
        user: { id: userId },
      },
      order: {
        name: 'ASC',
      },
    });
  }

  //update tag
  async updateTag(id: number, tagDto: TagDto, userId: number) {
    const tag = await this.tagsRepo.findOne({
      where: { id, user: { id: userId } },
    });
    if (!tag) {
      throw new Error('Tag not found');
    }
    //azuriraj mu name
    //const updatedTag = { ...tag, name: name };
    await this.tagsRepo.update(id, { name: tagDto.name });
  }
}
