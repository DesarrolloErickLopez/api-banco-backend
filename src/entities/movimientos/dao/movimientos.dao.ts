import { DatabaseService } from '../../../database/services/database.service';
import { MovimientoModel } from '../models/movimientos.model';

export class MovimientosDao {
    constructor() {}

  static async obtenerDisponibleEnCajero(): Promise<number> {
    let no_cajero: number = 1;
    let sql: string;
    
    try {

        sql = 'SELECT disponible FROM cityutl.cajero_cityutl WHERE no_cajero = ?;';

        const values = [no_cajero];

        const result = await DatabaseService.executeQuery(sql, values);
        
        return result[0].disponible;
        
    } catch (error) {
        console.error('Error en MovimientosDao:', error);
        throw error;
    }

  }

  static async verificarCuentaCliente(cuenta: number): Promise<any> {
    let sql: string;
    
    try {

        sql = 'SELECT * FROM cityutl.cuentas_clientes WHERE numero_cuenta = ?;';

        const values = [cuenta];

        const result = await DatabaseService.executeQuery(sql, values);
        
        return result[0];
        
    } catch (error) {
        console.error('Error en MovimientosDao:', error);
        throw error;
    }

  }

  static async actualizarSaldo(saldo: number, cuenta: number): Promise<any> {
    let sql: string;
    
    try {

        sql = 'UPDATE cityutl.cuentas_clientes SET saldo = ? WHERE numero_cuenta = ?;';

        const values = [saldo, cuenta];
        
        const result: any = await DatabaseService.executeQuery(sql, values);
      
        return result.affectedRows;
        
    } catch (error) {
        console.error('Error en MovimientosDao:', error);
        throw error;
    }

  }

  static async actualizarDisponibleEnCajero(disponible: number): Promise<any> {
    let sql: string;
    
    try {

        sql = 'UPDATE cityutl.cajero_cityutl  SET disponible = ? WHERE no_cajero = 1;';

        const values = [disponible];

        const result: any = await DatabaseService.executeQuery(sql, values);
      
        return result.affectedRows;
        
    } catch (error) {
        console.error('Error en MovimientosDao:', error);
        throw error;
    }

  }

  static async insertarRetiro(nombre_banco:string, numero_cuenta:number, retiro:number, codigo_transaccion:number, estatus:number): Promise<any> {
    let sql: string;
    
    try {

        sql = 'INSERT INTO cityutl.transacciones(nombre_banco, numero_cuenta, retiro, codigo_transaccion, estatus, fecha_registro)VALUES(?, ?, ?, ?, ?, NOW())';

        const values = [nombre_banco, numero_cuenta, retiro, codigo_transaccion, estatus];
        
        const result: any = await DatabaseService.executeQuery(sql, values);
        
        return result.insertId;
        
    } catch (error) {
        console.error('Error en MovimientosDao:', error);
        throw error;
    }

  }

  static async consultarIp(): Promise<any> {
    let id_banco_externo: number = 3;
    let sql: string;
    
    try {

        sql = 'SELECT ip_banco_externo FROM cityutl.bancos_externos WHERE id_banco_externo = ? ;';

        const values = [id_banco_externo];
      
        const result: any = await DatabaseService.executeQuery(sql, values);
        
        return result[0];
        
    } catch (error) {
        console.error('Error en MovimientosDao:', error);
        throw error;
    }

  }

}
