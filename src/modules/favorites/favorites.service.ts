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
      this.favorites.artists.map(async (id) => {
        try {
          return await this.artistService.getById(id);
        } catch {
          return null;
        }
      }),
    ).then((res) => res.filter(Boolean));

    const albums = await Promise.all(
      this.favorites.albums.map(async (id) => {
        try {
          return await this.albumService.getById(id);
        } catch {
          return null;
        }
      }),
    ).then((res) => res.filter(Boolean));

    const tracks = await Promise.all(
      this.favorites.tracks.map(async (id) => {
        try {
          return await this.trackService.getById(id);
        } catch {
          return null;
        }
      }),
    ).then((res) => res.filter(Boolean));

    return { artists, albums, tracks };
  }
  async addArtist(id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid artistId', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.artistService.getById(id);
    } catch {
      throw new HttpException(
        'Artist does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!this.favorites.artists.includes(id)) {
      this.favorites.artists.push(id);
    }
  }
  async removeArtist(id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid artistId', HttpStatus.BAD_REQUEST);
    }

    if (!this.favorites.artists.includes(id)) {
      throw new HttpException('Artist not in favorites', HttpStatus.NOT_FOUND);
    }

    this.favorites.artists = this.favorites.artists.filter((x) => x !== id);
  }
  async addAlbum(id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid albumId', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.albumService.getById(id);
    } catch {
      throw new HttpException(
        'Album does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!this.favorites.albums.includes(id)) {
      this.favorites.albums.push(id);
    }
  }

  async removeAlbum(id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid albumId', HttpStatus.BAD_REQUEST);
    }

    if (!this.favorites.albums.includes(id)) {
      throw new HttpException('Album not in favorites', HttpStatus.NOT_FOUND);
    }

    this.favorites.albums = this.favorites.albums.filter((x) => x !== id);
  }

  async addTrack(id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid trackId', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.trackService.getById(id);
    } catch {
      throw new HttpException(
        'Track does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!this.favorites.tracks.includes(id)) {
      this.favorites.tracks.push(id);
    }
  }

  async removeTrack(id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid trackId', HttpStatus.BAD_REQUEST);
    }

    if (!this.favorites.tracks.includes(id)) {
      throw new HttpException('Track not in favorites', HttpStatus.NOT_FOUND);
    }

    this.favorites.tracks = this.favorites.tracks.filter((x) => x !== id);
  }
}
