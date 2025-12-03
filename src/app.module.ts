import { Module } from '@nestjs/common';
/*import { AppController } from './app.controller';
import { AppService } from './app.service';
*/
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artists/artist.module';
import { AlbumModule } from './modules/albums/album.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
/*import {AppController} from "./app.controller";*/
@Module({
  imports: [
    UserModule,
    ArtistModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
  ],
  /*controllers: [AppController],
  providers: [UserModule],*/
})
export class AppModule {}
