import { Injectable } from '@nestjs/common';
import { MovimientosDao } from '../dao/movimientos.dao';
import { MovimientoModel } from '../models/movimientos.model';
import { log } from 'console';

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
                return 'e0';
            }else if(accountResponse.nip != movimiento.nip){              
                return 'e1';
            }else if(accountResponse.saldo < movimiento.cantidad){
                return 'e2';
            }
            if(await MovimientosDao.actualizarSaldo(accountResponse.saldo - movimiento.cantidad, movimiento.cuenta) !== 1) return 'e3';

            let disponibleEnCajero = await MovimientosDao.obtenerDisponibleEnCajero();
            
            if (await MovimientosDao.actualizarDisponibleEnCajero(disponibleEnCajero - movimiento.cantidad) !== 1 ) return 'e4';

            let cuentaActualizada =  await MovimientosDao.verificarCuentaCliente(movimiento.cuenta);            
            
            return await MovimientosDao.insertarRetiro(movimiento.banco, movimiento.cuenta, movimiento.cantidad, 0, 1);
            
            
          } catch (error: any) {
            console.error('Error en MovimientosCqrs:', error);
            return `Error en MovimientosCqrs - Función: consultarCuentaCliente - ${error.message}`;
          }

    }

    async insertarClienteExterno(movimiento: MovimientoModel, codigo_transaccion: number): Promise<number | string > {

      try {
        
        if(movimiento.cuenta.toString().length > 4 || movimiento.cantidad === 0 )return "e0";

        return await MovimientosDao.insertarRetiro(movimiento.banco, movimiento.cuenta, movimiento.cantidad, codigo_transaccion, 1) ;
          
        } catch (error: any) {
          console.error('Error en MovimientosCqrs:', error);
          return `Error en MovimientosCqrs - Función: consultarCuentaCliente - ${error.message}`;
        }

  }


}
  