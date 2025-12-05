import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './track.entity';
import { ArtistService } from '../artists/artist.service';
import { AlbumService } from '../albums/album.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];
  //private artistService: ArtistService;
  constructor(
    @InjectRepository(Track)
    private readonly repo: Repository<Track>,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}
  async getAll() {
    return this.repo.find();
  }

  async getById(id: string) {
    const track = await this.repo.findOne({ where: { id } });
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  async create(
    name: string,
    duration: number,
    artistId: string | null,
    albumId: string | null,
  ) {
    if (artistId) {
      const artist = await this.artistService.getById(artistId);
      if (!artist) throw new NotFoundException('Artist not found');
    }

    if (albumId) {
      const album = await this.albumService.getById(albumId);
      if (!album) throw new NotFoundException('Album not found');
    }
    const newTrack = this.repo.create({
      name,
      duration,
      artistId: artistId || null,
      albumId: albumId || null,
    });

    return await this.repo.save(newTrack);
  }
  async updateTrack(
    id: string,
    name: string,
    duration: number,
    albumId: string | null,
    artistId: string | null,
  ) {
    const track = await this.getById(id);
    if (!track) throw new NotFoundException('Track not found');

    if (artistId) {
      const artist = await this.artistService.getById(artistId);
      if (!artist) throw new NotFoundException('Artist not found');
    }

    if (albumId) {
      const album = await this.albumService.getById(albumId);
      if (!album) throw new NotFoundException('Album not found');
    }

    track.name = name;
    track.duration = duration;
    track.artistId = artistId || null;
    track.albumId = albumId || null;
    return await this.repo.save(track);
  }
  async nullifyArtist(artistId: string) {
    await this.repo.update({ artistId }, { artistId: null });
  }
  async nullifyAlbum(albumId: string) {
    await this.repo.update({ albumId }, { albumId: null });
  }
  async delete(id: string) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) return false;
    return true;
  }
}
