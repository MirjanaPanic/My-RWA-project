import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TagDto } from './dtos/tag.dto';
import { TagsService } from './tags.service';
import { CurrentUser } from 'src/core/auth/decorators/currentUser.decorator';
import { JwtGuard } from 'src/core/auth/guards/jwt.guard';
import { Tag } from './entities/tag.entity';

@UseGuards(JwtGuard) //
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post('new')
  create(@Body() tagDto: TagDto, @CurrentUser() userId: number) {
    return this.tagsService.addNewTag(tagDto, userId);
  }

  @Get('all')
  allTags(@CurrentUser() userId: number): Promise<Tag[]> {
    return this.tagsService.getAllTags(userId);
  }

  @Get('search')
  searchTags(@CurrentUser() userId: number, @Query('input') input: string) {
    return this.tagsService.getMatchedTags(userId, input);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number, @CurrentUser() userId: number) {
    return this.tagsService.deleteTag(id, userId);
  }

  @Put('update/:id')
  update(
    @Param('id') id: number,
    @Body() tagDto: TagDto,
    @CurrentUser() userId: number,
  ) {
    return this.tagsService.updateTag(id, tagDto, userId);
  }
}
