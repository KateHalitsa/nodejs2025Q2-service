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
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.getById(id);
    if (!track)
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);

    return track;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: TrackDto) {
    const result = this.trackService.create(
      dto.name,
      dto.duration,
      dto.artistId,
      dto.albumId,
    );
    if (result === 'artist_not_found')
      throw new HttpException('Artist not found', 400);
    return result;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updatePassword(
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

    if (result === 'not_found')
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);

    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const ok = this.trackService.delete(id);

    if (!ok) throw new HttpException('Track not found', HttpStatus.NOT_FOUND);

    return { statusCode: 204 };
  }
}
