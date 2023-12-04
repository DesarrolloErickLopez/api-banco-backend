import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsuariosDao } from '../dao/usuarios.dao';

@Controller('usuarios')
export class UsuariosController {

  constructor() {}
  
  @Post('login')
  async postLogin(@Req() req: Request, @Res() res: Response) {

    try {
        console.log(req.body);  
        let response;
        const daoResponse = await UsuariosDao.obtenerUsuarios(req.body);

        if(daoResponse){
            response = {
                estatus: 1,
                data: daoResponse
            };
        }else{
            response = {
                estatus: 0,
                mensaje: "El usuario no existe."
            };
        }     
        res.send(response);

    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).send({ message: 'Error en el servidor' });
    }
  }

}