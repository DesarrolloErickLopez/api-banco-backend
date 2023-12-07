import { Module } from '@nestjs/common';
import { ProductosDaoController } from './controllers/productos.controller';

@Module({
  controllers: [ProductosDaoController],
  providers: [],
})
export class ProductosModule {}
