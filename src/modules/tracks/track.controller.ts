import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';

import { TrackService } from './track.service';
import { TrackDto } from './track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.getById(id);
    if (!track)
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);

    return track;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: TrackDto) {
    const result = this.trackService.create(
      dto.name,
      dto.duration,
      dto.artistId,
      dto.albumId,
    );

    return result;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: TrackDto,
  ) {
    const result = this.trackService.updateTrack(
      id,
      dto.name,
      dto.duration,
      dto.artistId,
      dto.albumId,
    );
    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const ok = await this.trackService.delete(id);

    if (!ok) throw new HttpException('Track not found', HttpStatus.NOT_FOUND);

    return;
  }
}
