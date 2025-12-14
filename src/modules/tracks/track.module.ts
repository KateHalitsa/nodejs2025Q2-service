import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';

import { TrackService } from './track.service';
import { ArtistModule } from '../artists/artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { AlbumModule } from '../albums/album.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track]),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
  ],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
