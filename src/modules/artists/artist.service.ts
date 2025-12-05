import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ArtistResponseDto } from './update-artist.dto';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];
  constructor(
    @InjectRepository(Artist)
    private readonly repo: Repository<Artist>,
  ) {}
  async getAll() {
    const artists = await this.repo.find();
    return plainToInstance(ArtistResponseDto, artists, {
      excludeExtraneousValues: true,
    });
  }

  async getById(id: string) {
    const artist = await this.repo.findOne({ where: { id } });
    if (!artist) throw new NotFoundException('Artist not found');

    return plainToInstance(ArtistResponseDto, artist, {
      excludeExtraneousValues: true,
    });
  }

  async create(name: string, grammy: boolean) {
    const newArtist = this.repo.create({
      name,
      grammy,
    });
    await this.repo.save(newArtist);

    return plainToInstance(ArtistResponseDto, newArtist, {
      excludeExtraneousValues: true,
    });
  }
  async updateArtist(id: string, name: string, grammy: boolean) {
    const artist = await this.repo.findOne({ where: { id } });
    if (!artist) throw new NotFoundException('Artist not found');
    artist.name = name;
    artist.grammy = grammy;
    const updated = await this.repo.save(artist);

    return plainToInstance(ArtistResponseDto, updated, {
      excludeExtraneousValues: true,
    });
  }
  async delete(id: string) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Artist not found');
  }
}
