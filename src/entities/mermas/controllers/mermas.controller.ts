import { Controller, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { MermasDao } from '../dao/mermas.dao';

@Controller('mermas')
export class MermasController {

  constructor() {}
  
  
  @Get('listarMermas')
  async getObtenerMaterias(@Req() req: Request, @Res() res: Response) {

    try {
        
        let response;
        const daoResponse = await MermasDao.obtenerMermas();
      
        res.send(daoResponse);

    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).send({ message: 'Error en el servidor' });
    }
  }

  @Post('insertarMermas')
  async insertarMateriaPrima(@Req() req: Request, @Res() res: Response){
    try {
      console.log(req.body)
      let response;
      const daoResponse = await MermasDao.insertarMermas(req.body.id_producto, req.body.monto_mermado, req.body.id_unidad, req.body.causa);

      if(daoResponse != 0){
        response = {
          estatus: 1,
          mensaje: "Merma registrado"
        }
      }else{
        response = {
          estatus:0,
          mensaje: "Error al insertar la merma"
        }
      }

      res.send(response);

    } catch (error) {
      console.log('Error en el controlador: ', error);
      res.status(500).send({message: 'Error en el servidor'});
    }
  }

  @Put('actualizarMerma')
  async actualizarPMateria(@Req() req: Request, @Res() res: Response){
    try {
      let response;
      const daoResponse = await MermasDao.actualizarMermas(req.body.id, req.body.id_producto, req.body.monto_mermado, req.body.id_unidad, req.body.causa);

      if(daoResponse != 0){
        response = {
          estatus: 1,
          mensaje: "Merma modificado"
        }
      }else{
        response = {
          estatus:0,
          mensaje: "Error al modificar la merma"
        }
      }

      res.send(response);

    } catch (error) {
      console.log('Error en el controlador: ', error);
      res.status(500).send({message: 'Error en el servidor'});
    }
  }

  @Delete('eliminarMerma')
  async eliminarProducto(@Req() req: Request, @Res() res: Response){
    try {
      let response;
      const daoResponse = await MermasDao.eliminarMermas(req.body.id);

      if(daoResponse != 0){
        response = {
          estatus: 1,
          mensaje: "Merma eliminada"
        }
      }else{
        response = {
          estatus:0,
          mensaje: "Error al eliminar la merma"
        }
      }

      res.send(response);
    } catch (error) {
      console.log('Error en el controlador: ', error);
      res.status(500).send({message: 'Error en el servidor'});
    }
  }

}