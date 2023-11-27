import { Injectable } from '@nestjs/common';
import { MovimientosDao } from '../dao/movimientos.dao';
import { MovimientoModel } from '../models/movimientos.model';

@Injectable()
export class MovimientoCqrs {
    
    constructor() {}

    async consultarDisponibleEnCajero(cantidad: number): Promise<boolean | string | any> {

        try {
      
            return (await MovimientosDao.obtenerDisponibleEnCajero() < cantidad);
            
          } catch (error: any) {
            console.error('Error en MovimientosCqrs:', error);
            return `Error en MovimientosCqrs - Función: consultarDisponibleEnCajero - ${error.message}`;
          }

    }

    async consultarCuentaCliente(movimiento: MovimientoModel): Promise<number | string > {

        try {

            let accountResponse =  await MovimientosDao.verificarCuentaCliente(movimiento.cuenta);
            if(!accountResponse){
                return 0;
            }else if(accountResponse.nip !== movimiento.nip){
                return 1;
            }else if(accountResponse.saldo < movimiento.cantidad){
                return 2;
            }
            await MovimientosDao.actualizarSaldo(accountResponse.saldo - movimiento.cantidad, movimiento.cuenta);
            let cuentaActualizada =  await MovimientosDao.verificarCuentaCliente(movimiento.cuenta);
            return cuentaActualizada.saldo;
            
            
          } catch (error: any) {
            console.error('Error en MovimientosCqrs:', error);
            return `Error en MovimientosCqrs - Función: consultarCuentaCliente - ${error.message}`;
          }

    }


}
  