import { Module } from '@nestjs/common';
import { MovimientosModule } from './entities/movimientos/movimientos.module';
import { UsuariosModule } from './entities/usuarios/usuarios.module';
import { ProductosModule } from './entities/productos/productos.module';

@Module({
  controllers: [],
  imports: [MovimientosModule, UsuariosModule, ProductosModule],
})
export class AppModule {}