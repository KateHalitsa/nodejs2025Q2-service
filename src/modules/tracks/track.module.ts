import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';

import { TrackService } from './track.service';
import { ArtistModule } from '../artists/artist.module';

@Module({
  imports: [forwardRef(() => ArtistModule)],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
