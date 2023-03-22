import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurpModule } from './curp/curp.module';
import { MongooseModule } from '@nestjs/mongoose/dist';

@Module({
  imports: [CurpModule, MongooseModule.forRoot("mongodb://127.0.0.1:27017/sonetasot")],
  controllers: [],
  providers: [],
})
export class AppModule {}
