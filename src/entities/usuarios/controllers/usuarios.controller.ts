import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsuariosDao } from '../dao/usuarios.dao';

@Controller('usuarios')
export class UsuariosController {

  constructor() {}
  
  @Post('registrar')
  async postRecuperar(@Req() req: Request, @Res() res: Response) {

    try {
      let response;
      const insertDao = await UsuariosDao.insertarUsuario(req.body);

      if(insertDao != 0){
        response ={
          estatus: 1,
          mensaje: "Usuario registrado con éxito"
        }
      }else{
        response = {
          estatus: 0,
          mensaje: "Error al insertar"
        }
      }

      res.send(response);

    } catch (error) {
      console.log("Error en el servidor " + error);
      return res.status(500).send({messagge: "Error en el servidor"});
    }
    
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