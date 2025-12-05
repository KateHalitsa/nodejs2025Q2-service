import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'uuid';
import { ArtistService } from '../artists/artist.service';
import { AlbumService } from '../albums/album.service';
import { TrackService } from '../tracks/track.service';
import { Favorites } from './favorites.entity';
import { FavoritesResponse } from './favorites.dto';

@Injectable()
export class FavoritesService {
  private favorites = new Favorites();

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async getAll(): Promise<FavoritesResponse> {
    const artists = await Promise.all(
      this.favorites.artists.map((id) => this.artistService.getById(id)),
    ).then((res) => res.filter(Boolean));

    const albums = await Promise.all(
      this.favorites.albums.map((id) => this.albumService.getById(id)),
    ).then((res) => res.filter(Boolean));

    const tracks = await Promise.all(
      this.favorites.tracks.map((id) => this.trackService.getById(id)),
    ).then((res) => res.filter(Boolean));

    return { artists, albums, tracks };
  }

  addArtist(id: string) {
    if (!validate(id))
      throw new HttpException('Invalid artistId', HttpStatus.BAD_REQUEST);

    const artist = this.artistService.getById(id);
    if (!artist)
      throw new HttpException(
        'Artist does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    if (!this.favorites.artists.includes(id)) this.favorites.artists.push(id);
  }

  removeArtist(id: string) {
    if (!validate(id))
      throw new HttpException('Invalid artistId', HttpStatus.BAD_REQUEST);

    if (!this.favorites.artists.includes(id))
      throw new HttpException('Artist not in favorites', HttpStatus.NOT_FOUND);

    this.favorites.artists = this.favorites.artists.filter((a) => a !== id);
  }

  addAlbum(id: string) {
    if (!validate(id))
      throw new HttpException('Invalid albumId', HttpStatus.BAD_REQUEST);

    const album = this.albumService.getById(id);
    if (!album)
      throw new HttpException(
        'Album does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    if (!this.favorites.albums.includes(id)) this.favorites.albums.push(id);
  }

  removeAlbum(id: string) {
    if (!validate(id))
      throw new HttpException('Invalid albumId', HttpStatus.BAD_REQUEST);

    if (!this.favorites.albums.includes(id))
      throw new HttpException('Album not in favorites', HttpStatus.NOT_FOUND);

    this.favorites.albums = this.favorites.albums.filter((a) => a !== id);
  }

  addTrack(id: string) {
    if (!validate(id))
      throw new HttpException('Invalid trackId', HttpStatus.BAD_REQUEST);

    const track = this.trackService.getById(id);
    if (!track)
      throw new HttpException(
        'Track does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    if (!this.favorites.tracks.includes(id)) this.favorites.tracks.push(id);
  }

  removeTrack(id: string) {
    if (!validate(id))
      throw new HttpException('Invalid trackId', HttpStatus.BAD_REQUEST);

    if (!this.favorites.tracks.includes(id))
      throw new HttpException('Track not in favorites', HttpStatus.NOT_FOUND);

    this.favorites.tracks = this.favorites.tracks.filter((t) => t !== id);
  }
}
