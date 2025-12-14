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

import { ArtistService } from './artist.service';
import { ArtistDto } from './update-artist.dto';
import { AlbumService } from '../albums/album.service';
import { TrackService } from '../tracks/track.service';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

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
    return this.artistService.updateArtist(id, dto.name, dto.grammy);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.artistService.delete(id);

    await this.albumService.nullifyArtist(id);

    await this.trackService.nullifyArtist(id);
    /*
    this.favoritesService.removeArtist(id);
    */
    return;
  }
}
