import { Module } from '@nestjs/common';
import { MovimientosModule } from './entities/movimientos/movimientos.module';
import { UsuariosModule } from './entities/usuarios/usuarios.module';
import { ProductosModule } from './entities/productos/productos.module';
import { MateriasPrimasModule } from './entities/materiasPrimas/materiasPrimas.module';
import { MermasModule } from './entities/mermas/mermas.module';

@Module({
  controllers: [],
  imports: [MovimientosModule, UsuariosModule, ProductosModule, MateriasPrimasModule, MermasModule],
})
export class AppModule {}