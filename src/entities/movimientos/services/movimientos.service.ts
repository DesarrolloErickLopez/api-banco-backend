import { Injectable } from '@nestjs/common';
import { MovimientoModel } from '../models/movimientos.model';
import { MovimientoCqrs } from '../cqrs/movimientos.cqrs';
import { ErrorMessage, SuccessfulMessage } from '../../../common/utils/movimientos.utils';
import { MovimientosDao } from '../dao/movimientos.dao';
import axios from 'axios';

@Injectable()
export class MovimientosService {

  constructor(private cqrs: MovimientoCqrs) {}

  async retiroEfectivoInterno(movimiento: MovimientoModel): Promise<object | string | any> {

    try {
      //if(movimiento.banco !== "bbvutl") return this.retiroEfectivoExterno(movimiento);
      if(movimiento.banco == "bbvutl") {
        if(await this.cqrs.consultarDisponibleEnCajero(movimiento.cantidad))return ErrorMessage.DISPONIBLE_INSUFICIENTE;
        let cuentaClienteResponse = await this.cqrs.consultarCuentaCliente(movimiento)
        if(cuentaClienteResponse === 0) return ErrorMessage.CLIENTE_INEXISTENTE;
        if(cuentaClienteResponse === 1) return ErrorMessage.CREDENCIALES_INVALIDAS;
        if(cuentaClienteResponse === 2) return ErrorMessage.SALDO_INSUFICIENTE;
        if(await MovimientosDao.insertarRetiro(movimiento.banco, movimiento.cuenta, movimiento.cantidad, 0, 1)) return {saldo: cuentaClienteResponse, message: SuccessfulMessage.RETIRO_EXITOSO.message};
        return;
      }else{
        let ip = await MovimientosDao.consultarIp();
        let insertResponse = await MovimientosDao.insertarRetiro(movimiento.banco, movimiento.cuenta, movimiento.cantidad, 0, 0);
        const response = await axios.post(ip.ip_banco, {
          banco: movimiento.banco,
          cuenta: movimiento.cuenta,
          nip: movimiento.nip,
          cantidad: movimiento.cantidad,
          codigo_de_transaccion: insertResponse,          
        });
        let updateResponse = await MovimientosDao.actualizarRetiro(response.data.codigo_de_transaccion);
        return SuccessfulMessage.RETIRO_EXTERNO_EXITOSO;
      }

    } catch (error: any) {
      console.error('Error en MovimientosService:', error);
      return `Error en MovimientosService - Función: retiroEfectivoInterno - ${error.message}`;
    }
  }

  async retiroEfectivoExterno(body: any): Promise<object | string | any> {

    try {
      
      let cuentaClienteResponse = await this.cqrs.consultarCuentaCliente(body)
      if(cuentaClienteResponse === 0) return ErrorMessage.CLIENTE_INEXISTENTE;
      if(cuentaClienteResponse === 1) return ErrorMessage.CREDENCIALES_INVALIDAS;
      if(cuentaClienteResponse === 2) return ErrorMessage.SALDO_INSUFICIENTE;
      let insertResponse = await MovimientosDao.insertarRetiro(body.banco, body.cuenta, body.cantidad, body.codigo_de_transaccion, 1);
      if(!insertResponse)return {codigo_inerno: insertResponse, codigo_externo: body.codigo_de_transaccion, message: SuccessfulMessage.RETIRO_EXITOSO.message};
      return{error: ErrorMessage.RETIRO_INVALIDO.message};

    } catch (error: any) {
      console.error('Error en MovimientosService:', error);
      return `Error en MovimientosService - Función: retiroEfectivoExterno - ${error.message}`;
    }
  }

}
