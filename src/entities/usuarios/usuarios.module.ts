import { Module } from '@nestjs/common';
import { UsuariosController } from './controllers/usuarios.controller';

@Module({
  controllers: [UsuariosController],
  providers: [],
})
export class UsuariosModule {}
