import { Controller, Get, Post, Delete, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { MateriasPrimasDao } from '../dao/materasPrimas.dao';

@Controller('materiasPrimas')
export class MateriasPrimasController {

  constructor() {}
  
  @Get('listarMateriasPrimas')
  async getObtenerMaterias(@Req() req: Request, @Res() res: Response) {

    try {
        
        let response;
        const daoResponse = await MateriasPrimasDao.obtenerMaateriasPrimas();
      
        res.send(daoResponse);

    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).send({ message: 'Error en el servidor' });
    }
  }

  @Post('insertarMateriPrima')
  async insertarMateriaPrima(@Req() req: Request, @Res() res: Response){
    try {
      console.log(req.body)
      let response;
      const daoResponse = await MateriasPrimasDao.insertarMateriaPrima(req.body.nombre, req.body.costo, req.body.stock, req.body.id_unidad);

      if(daoResponse != 0){
        response = {
          estatus: 1,
          mensaje: "Materia prima registrado"
        }
      }else{
        response = {
          estatus:0,
          mensaje: "Error al insertar la materia prima"
        }
      }

      res.send(response);

    } catch (error) {
      console.log('Error en el controlador: ', error);
      res.status(500).send({message: 'Error en el servidor'});
    }
  }

  @Put('actualizarMateriaPrima')
  async actualizarPMateria(@Req() req: Request, @Res() res: Response){
    try {
      let response;
      const daoResponse = await MateriasPrimasDao.actualizarMateriaPrima(req.body.id, req.body.nombre, req.body.costo, req.body.stock, req.body.id_unidad);

      if(daoResponse != 0){
        response = {
          estatus: 1,
          mensaje: "Materia prima modificado"
        }
      }else{
        response = {
          estatus:0,
          mensaje: "Error al modificar la materia prima"
        }
      }

      res.send(response);

    } catch (error) {
      console.log('Error en el controlador: ', error);
      res.status(500).send({message: 'Error en el servidor'});
    }
  }

  @Delete('eliminarMateriPrima')
  async eliminarProducto(@Req() req: Request, @Res() res: Response){
    try {
      let response;
      const daoResponse = await MateriasPrimasDao.eliminarMateriaPrima(req.body.id);

      if(daoResponse != 0){
        response = {
          estatus: 1,
          mensaje: "Materia prima eliminado"
        }
      }else{
        response = {
          estatus:0,
          mensaje: "Error al eliminar la materia prima"
        }
      }

      res.send(response);
    } catch (error) {
      console.log('Error en el controlador: ', error);
      res.status(500).send({message: 'Error en el servidor'});
    }
  }
}