import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Album } from './album.entity';
import { ArtistService } from '../artists/artist.service';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];
  //private artistService: ArtistService;
  constructor(private readonly artistService: ArtistService) {}
  getAll() {
    return this.albums.map(({ ...album }) => album);
  }

  getById(id: string) {
    const album = this.albums.find((u) => u.id === id);
    if (!album) return null;
    return album;
  }

  create(name: string, year: number, artistId: string | null) {
    if (artistId && !this.artistService.getById(artistId)) {
      return 'artist_not_found';
    }
    const newAlbums: Album = {
      id: uuid(),
      name,
      year,
      artistId,
    };
    this.albums.push(newAlbums);
    return newAlbums;
  }
  updateAlbum(id: string, name: string, year: number, artistId: string | null) {
    const album = this.albums.find((u) => u.id === id);
    if (!album) return 'not_found';
    album.name = name;
    album.year = year;
    album.artistId = artistId;
    return album;
  }
  nullifyArtist(artistId: string) {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }

  delete(id: string) {
    const index = this.albums.findIndex((u) => u.id === id);
    if (index === -1) return false;

    this.albums.splice(index, 1);
    return true;
  }
}
