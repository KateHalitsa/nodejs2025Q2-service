import { Module } from '@nestjs/common';
/*import { AppController } from './app.controller';
import { AppService } from './app.service';
*/
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artists/artist.module';
import { AlbumModule } from './modules/albums/album.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
/*import {AppController} from "./app.controller";*/
@Module({
  imports: [
    UserModule,
    ArtistModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // обязательно false при миграциях
    }),
  ],
  /*controllers: [AppController],
  providers: [UserModule],*/
})
export class AppModule {}
