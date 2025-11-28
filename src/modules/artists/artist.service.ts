import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  getAll() {
    return this.artists.map(({ ...artist }) => artist);
  }

  getById(id: string) {
    const artist = this.artists.find((u) => u.id === id);
    if (!artist) return null;
    return artist;
  }

  create(name: string, grammy: boolean) {
    const newArtists: Artist = {
      id: uuid(),
      name,
      grammy,
    };
    this.artists.push(newArtists);
    return newArtists;
  }
  updateArtist(id: string, name: string, grammy: boolean) {
    const artist = this.artists.find((u) => u.id === id);
    if (!artist) return 'not_found';
    artist.name = name;
    artist.grammy = grammy;
    return artist;
  }
  delete(id: string) {
    const index = this.artists.findIndex((u) => u.id === id);
    if (index === -1) return false;

    this.artists.splice(index, 1);
    return true;
  }
}
