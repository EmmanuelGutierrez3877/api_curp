import { Module } from '@nestjs/common';
import { CurpService } from './curp.service';
import { CurpController } from './curp.controller';
import { curpSchema } from './curp.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'Curp',schema:curpSchema}])
  ],
  providers: [CurpService],
  controllers: [CurpController],
  exports: [CurpService]
})
export class CurpModule {}
