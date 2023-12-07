import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductosDao } from '../dao/productos.dao';

@Controller('productos')
export class ProductosDaoController {

  constructor() {}
  
  @Get('listarProductos')
  async getObtenerProductos(@Req() req: Request, @Res() res: Response) {

    try {
        
        let response;
        const daoResponse = await ProductosDao.obtenerProductos();
        // console.log(daoResponse);

        for (const key in daoResponse) {
          console.log(
            daoResponse[key].id_producto
          );
          console.log(
            daoResponse[key].nombre_producto
          );
          const daoResponse2 = await ProductosDao.obtenerDetallesProductos();
        }
        
        res.send(daoResponse);
        // if(!daoResponse){
        //     response = {
        //         estatus: 0,
        //         mensaje: "El usuario no existe."
        //     };
        // }else if(daoResponse.contrasenia != req.body.contrasenia){
        //     response = {
        //         estatus: -1,
        //         mensaje: "Contraseña incorrecta."
        //     };
        // }else{
        //     response = {
        //         estatus: 1,
        //         data: daoResponse
        //     };
        // }
             
        // res.send(response);

    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).send({ message: 'Error en el servidor' });
    }
  }

}