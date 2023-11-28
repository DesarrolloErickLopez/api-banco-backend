import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { MovimientoModel } from '../models/movimientos.model';
import { MovimientosService } from '../services/movimientos.service'; 

@Controller('movimientos')
export class MovimientosController {

  constructor(private service: MovimientosService) {}
  
  @Post()
  async postRetirar(@Req() req: Request, @Res() res: Response) {
    const movimiento: MovimientoModel = req.body;

    try {

      const serviceResponse = await this.service.retiroEfectivoInterno(movimiento);
      res.send(serviceResponse);

    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).send({ message: 'Error en el servidor' });
    }
  }
  
  @Post('externo')
  async postRetirarExterno(@Req() req: Request, @Res() res: Response) {

    try {
      
      const serviceResponse = await this.service.retiroEfectivoExterno(req.body);  
      res.send(serviceResponse);

    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).send({ message: 'Error en el servidor' });
    }
  }


}
