import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';

import { AlbumService } from './album.service';
import { ArtistModule } from '../artists/artist.module';
import { TrackModule } from '../tracks/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
