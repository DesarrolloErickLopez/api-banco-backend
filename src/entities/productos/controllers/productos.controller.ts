import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
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

        }
        
        res.send(daoResponse);

    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).send({ message: 'Error en el servidor' });
    }
  }

  @Get('obtenerUnProducto')
  async getObtenerProducto(@Req() req: Request, @Res() res: Response) {

    try {
        
        let response;
        const daoResponse = await ProductosDao.obtenerUnProductos(req.body.id);
        
        res.send(daoResponse);

    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).send({ message: 'Error en el servidor' });
    }
  }

  @Post('insertarProducto')
  async insertarProducto(@Req() req: Request, @Res() res: Response){
    try {
      console.log(req.body)
      let response;
      const daoResponse = await ProductosDao.insertarProducto(req.body.nombre);

      if(daoResponse != 0){
        response = {
          estatus: 1,
          mensaje: "Producto registrado"
        }
      }else{
        response = {
          estatus:0,
          mensaje: "Error al insertar el producto"
        }
      }

      
      res.send(response);



    } catch (error) {
      console.log('Error en el controlador: ', error);
      res.status(500).send({message: 'Error en el servidor'});
    }
  }

  @Put('actualizarProducto')
  async actualizarProducto(@Req() req: Request, @Res() res: Response){
    try {
      let response;
      const daoResponse = await ProductosDao.actualizarProducto(req.body.id, req.body.nombre);

      if(daoResponse != 0){
        response = {
          estatus: 1,
          mensaje: "Producto modificado"
        }
      }else{
        response = {
          estatus:0,
          mensaje: "Error al modificar el producto"
        }
      }

      res.send(response);

    } catch (error) {
      console.log('Error en el controlador: ', error);
      res.status(500).send({message: 'Error en el servidor'});
    }
  }

  @Delete('eliminarProducto')
  async eliminarProducto(@Req() req: Request, @Res() res: Response){
    try {
      let response;
      const daoResponse = await ProductosDao.eliminarProducto(req.body.id);

      if(daoResponse != 0){
        response = {
          estatus: 1,
          mensaje: "Producto eliminado"
        }
      }else{
        response = {
          estatus:0,
          mensaje: "Error al eliminar el producto"
        }
      }

      res.send(response);
    } catch (error) {
      console.log('Error en el controlador: ', error);
      res.status(500).send({message: 'Error en el servidor'});
    }
  }

  @Get('ventas')
  async getObtenerVentas(@Req() req: Request, @Res() res: Response){
    try {
      const daoResponse = await ProductosDao.obtenerVentas();

      res.send(daoResponse);

    } catch (error) {
      console.log('Error en el controlador: ', error);
      res.status(500).send({message: 'Error en el servidor'});
    }
  }

}