import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Track } from './track.entity';
import { ArtistService } from '../artists/artist.service';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];
  //private artistService: ArtistService;
  constructor(private readonly artistService: ArtistService) {}
  getAll() {
    return this.tracks.map(({ ...track }) => track);
  }

  getById(id: string) {
    const track = this.tracks.find((u) => u.id === id);
    if (!track) return null;
    return track;
  }

  create(
    name: string,
    duration: number,
    artistId: string | null,
    albumId: string | null,
  ) {
    if (artistId && !this.artistService.getById(artistId)) {
      return 'artist_not_found';
    }
    const newTracks: Track = {
      id: uuid(),
      name,
      duration,
      artistId,
      albumId,
    };
    this.tracks.push(newTracks);
    return newTracks;
  }
  updateTrack(
    id: string,
    name: string,
    duration: number,
    albumId: string | null,
    artistId: string | null,
  ) {
    const track = this.tracks.find((u) => u.id === id);
    if (!track) return 'not_found';
    track.name = name;
    track.duration = duration;
    track.artistId = artistId;
    return track;
  }
  nullifyArtist(artistId: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }
  nullifyAlbum(albumId: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
  delete(id: string) {
    const index = this.tracks.findIndex((u) => u.id === id);
    if (index === -1) return false;

    this.tracks.splice(index, 1);
    return true;
  }
}
