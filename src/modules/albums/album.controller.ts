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
  Inject,
  forwardRef,
} from '@nestjs/common';

import { AlbumService } from './album.service';
import { AlbumDto } from './album.dto';
import { TrackService } from '../tracks/track.service';

@Controller('album')
export class AlbumController {
  constructor(
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.getById(id);
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);

    return album;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: AlbumDto) {
    const result = this.albumService.create(dto.name, dto.year, dto.artistId);
    return result;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: AlbumDto,
  ) {
    const result = this.albumService.updateAlbum(
      id,
      dto.name,
      dto.year,
      dto.artistId,
    );
    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const ok = await this.albumService.delete(id);

    if (!ok) throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    await this.trackService.nullifyAlbum(id);

    return;
  }
}
