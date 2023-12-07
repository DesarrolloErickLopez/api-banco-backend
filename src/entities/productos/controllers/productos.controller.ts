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

        for (const key in daoResponse) {
          
          daoResponse[key].detalles = await ProductosDao.obtenerDetallesProductos(daoResponse[key].id_producto);

          // console.log(
          //   daoResponse[key]
          // );
        }
        
        res.send(daoResponse);

    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).send({ message: 'Error en el servidor' });
    }
  }

}