import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsuariosDao } from '../dao/usuarios.dao';

@Controller('usuarios')
export class UsuariosController {

  constructor() {}
  
  @Post('recuperar')
  async postRecuperar(@Req() req: Request, @Res() res: Response) {

    console.log(req.body.correo);
    
  }

  @Post('login')
  async postLogin(@Req() req: Request, @Res() res: Response) {

    try {
        
        let response;
        const daoResponse = await UsuariosDao.obtenerUsuarios(req.body);
        
        if(!daoResponse){
            response = {
                estatus: 0,
                mensaje: "El usuario no existe."
            };
        }else if(daoResponse.contrasenia != req.body.contrasenia){
            response = {
                estatus: -1,
                mensaje: "Contraseña incorrecta."
            };
        }else{
            response = {
                estatus: 1,
                data: daoResponse
            };
        }
             
        res.send(response);

    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).send({ message: 'Error en el servidor' });
    }
  }

}