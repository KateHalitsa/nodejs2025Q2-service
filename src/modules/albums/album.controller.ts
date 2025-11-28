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

import { AlbumService } from './album.service';
import { AlbumDto } from './album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.getById(id);
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);

    return album;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: AlbumDto) {
    const result = this.albumService.create(dto.name, dto.year, dto.artistId);
    if (result === 'artist_not_found')
      throw new HttpException('Artist not found', 400);
    return result;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: AlbumDto,
  ) {
    const result = this.albumService.updateAlbum(
      id,
      dto.name,
      dto.year,
      dto.artistId,
    );

    if (result === 'not_found')
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);

    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const ok = this.albumService.delete(id);

    if (!ok) throw new HttpException('Album not found', HttpStatus.NOT_FOUND);

    return { statusCode: 204 };
  }
}
