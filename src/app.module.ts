import { Module } from '@nestjs/common';
/*import { AppController } from './app.controller';
import { AppService } from './app.service';
*/
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artists/artist.module';
/*import {AppController} from "./app.controller";*/
@Module({
  imports: [UserModule, ArtistModule],
  /*controllers: [AppController],
  providers: [UserModule],*/
})
export class AppModule {}
