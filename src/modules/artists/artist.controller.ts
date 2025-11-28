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

import { ArtistService } from './artist.service';
import { ArtistDto } from './update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.getById(id);
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);

    return artist;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: ArtistDto) {
    return this.artistService.create(dto.name, dto.grammy);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: ArtistDto,
  ) {
    const result = this.artistService.updateArtist(id, dto.name, dto.grammy);

    if (result === 'not_found')
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);

    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const ok = this.artistService.delete(id);

    if (!ok) throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);

    return { statusCode: 204 };
  }
}
