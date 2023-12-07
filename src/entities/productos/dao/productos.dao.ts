import { DatabaseService } from '../../../database/services/database.service';

export class ProductosDao {
    constructor() {}

  static async obtenerProductos(): Promise<any> {
    let sql: string;
    
    try {

        sql = `
        SELECT * FROM don_galleto.productos;
        `;

        const result = await DatabaseService.executeQuery(sql);
        
        return result;
        
    } catch (error) {
        console.error('Error en MovimientosDao:', error);
        throw error;
    }

  }

  static async obtenerDetallesProductos(): Promise<any> {
    let sql: string;
    
    try {

        sql = `
        SELECT * FROM don_galleto.productos;
        `;

        const result = await DatabaseService.executeQuery(sql);
        
        return result;
        
    } catch (error) {
        console.error('Error en MovimientosDao:', error);
        throw error;
    }

  }
}