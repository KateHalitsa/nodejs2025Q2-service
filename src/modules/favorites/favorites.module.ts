import { forwardRef, Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';

import { FavoritesService } from './favorites.service';
import { ArtistModule } from '../artists/artist.module';
import { AlbumModule } from '../albums/album.module';
import { TrackModule } from '../tracks/track.module';
import {
  FavoriteAlbum,
  FavoriteArtist,
  FavoriteTrack,
} from './favorites.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteArtist, FavoriteAlbum, FavoriteTrack]),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
