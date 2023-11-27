import { Module } from '@nestjs/common';
import { MovimientosModule } from './entities/movimientos/movimientos.module';

@Module({
  controllers: [],
  imports: [MovimientosModule],
})
export class AppModule {}