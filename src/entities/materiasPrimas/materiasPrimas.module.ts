import { Module } from '@nestjs/common';
import { MateriasPrimasController } from './controller/materiasPrimas.controller';

@Module({
  controllers: [MateriasPrimasController],
  providers: [],
})
export class MateriasPrimasModule {}
