import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';

import { AlbumService } from './album.service';
import { ArtistModule } from '../artists/artist.module';
import { TrackModule } from '../tracks/track.module';

@Module({
  imports: [forwardRef(() => ArtistModule), forwardRef(() => TrackModule)],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
