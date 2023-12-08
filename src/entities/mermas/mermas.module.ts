import { Module } from '@nestjs/common';
import { MermasController } from './controllers/mermas.controller';

@Module({
  controllers: [MermasController],
  providers: [],
})
export class MermasModule {}
