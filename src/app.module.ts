import { Module } from '@nestjs/common';
/*import { AppController } from './app.controller';
import { AppService } from './app.service';
*/
import { UserModule } from './modules/user/user.module';
/*import {AppController} from "./app.controller";*/
@Module({
  imports: [UserModule],
  /*controllers: [AppController],
  providers: [UserModule],*/
})
export class AppModule {}
