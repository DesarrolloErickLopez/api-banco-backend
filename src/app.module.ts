import { Module } from '@nestjs/common';
import { MovimientosModule } from './entities/movimientos/movimientos.module';
import { UsuariosModule } from './entities/usuarios/usuarios.module';

@Module({
  controllers: [],
  imports: [MovimientosModule, UsuariosModule],
})
export class AppModule {}