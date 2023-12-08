import { DatabaseService } from '../../../database/services/database.service';
import { MovimientoModel } from '../models/movimientos.model';

export class MovimientosDao {
    constructor() {}

  static async obtenerDisponibleEnCajero(): Promise<number> {
    let id_cajero: number = 1;
    let sql: string;
    
    try {

        sql = 'SELECT disponible FROM bbvutl.cajero WHERE id_cajero = ?;';

        const values = [id_cajero];

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

        sql = 'SELECT * FROM bbvutl.cuentas WHERE no_cuenta = ?;';

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

        sql = 'UPDATE bbvutl.cuentas SET saldo = ? WHERE no_cuenta = ?;';

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

        sql = 'UPDATE bbvutl.cajero  SET disponible = ? WHERE id_cajero = 1;';

        const values = [disponible];

        const result: any = await DatabaseService.executeQuery(sql, values);
      
        return result.affectedRows;
        
    } catch (error) {
        console.error('Error en MovimientosDao:', error);
        throw error;
    }

  }

  static async insertarRetiro(banco:string, no_cuenta:number, monto:number, codigo_de_transaccion:number, estatus:number): Promise<any> {
    let sql: string;
    
    try {

        sql = 'INSERT INTO bbvutl.retiros(banco, no_cuenta, monto, codigo_de_transaccion, estatus, fecha)VALUES(?, ?, ?, ?, ?, NOW())';

        const values = [banco, no_cuenta, monto, codigo_de_transaccion, estatus];
        
        const result: any = await DatabaseService.executeQuery(sql, values);
        
        return result.insertId;
        
    } catch (error) {
        console.error('Error en MovimientosDao:', error);
        throw error;
    }

  }

  static async consultarIp(): Promise<any> {
    let id_cajero: number = 1;
    let sql: string;
    
    try {

        sql = 'SELECT ip_banco FROM bbvutl.bancos WHERE id_banco = ? ;';

        const values = [id_cajero];
        
        const result: any = await DatabaseService.executeQuery(sql, values);
        
        return result[0];
        
    } catch (error) {
        console.error('Error en MovimientosDao:', error);
        throw error;
    }

  }

  static async actualizarRetiro(id_retiro:number): Promise<any> {
    let sql: string;
    
    try {

        sql = 'UPDATE bbvutl.retiros SET estatus = 1 Where id_retiro = ? ;';

        const values = [id_retiro];
        
        const result: any = await DatabaseService.executeQuery(sql, values);
        
        return result.insertId;
        
    } catch (error) {
        console.error('Error en MovimientosDao:', error);
        throw error;
    }

  }

}
