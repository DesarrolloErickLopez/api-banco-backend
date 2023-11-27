import { Module } from '@nestjs/common';
import { MovimientosController } from './controllers/movimientos.controller';
import { MovimientosService } from './services/movimientos.service';
import { MovimientoCqrs } from './cqrs/movimientos.cqrs';

@Module({
  controllers: [MovimientosController],
  providers: [MovimientosService, MovimientoCqrs],
})
export class MovimientosModule {}
