import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Album } from './album.entity';
import { ArtistService } from '../artists/artist.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];
  //private artistService: ArtistService;
  constructor(
    @InjectRepository(Album)
    private readonly repo: Repository<Album>,
    private readonly artistService: ArtistService,
  ) {}
  getAll() {
    return this.repo.find();
  }

  async getById(id: string) {
    const album = await this.repo.findOne({ where: { id } });
    if (!album) throw new NotFoundException('Track not found');
    return album;
  }

  async create(name: string, year: number, artistId: string | null) {
    if (artistId) {
      const artist = await this.artistService.getById(artistId);
      if (!artist) throw new NotFoundException('Artist not found');
    }
    const newAlbums = this.repo.create({
      id: uuid(),
      name,
      year,
      artistId,
    });
    return await this.repo.save(newAlbums);
  }
  async updateAlbum(
    id: string,
    name: string,
    year: number,
    artistId: string | null,
  ) {
    const album = await this.getById(id);
    if (!album) throw new NotFoundException('Track not found');
    if (artistId) {
      const artist = await this.artistService.getById(artistId);
      if (!artist) throw new NotFoundException('Artist not found');
    }
    album.name = name;
    album.year = year;
    album.artistId = artistId || null;
    return await this.repo.save(album);
  }
  async nullifyArtist(artistId: string) {
    await this.repo.update({ artistId }, { artistId: null });
  }

  async delete(id: string) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) return false;
    return true;
  }
}
