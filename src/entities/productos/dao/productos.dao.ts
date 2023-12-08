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

  static async obtenerDetallesProductos(id: number): Promise<any> {
    let sql: string;
    
    try {

        sql = `
        SELECT  u.nombre_unidad, up.precio
        FROM don_galleto.unidades_por_producto up
        INNER JOIN don_galleto.unidades u ON u.id_unidad = up.id_unidad 
        WHERE up.id_producto = ${id};
        `;

        const result = await DatabaseService.executeQuery(sql);
        
        return result;
        
    } catch (error) {
        console.error('Error en MovimientosDao:', error);
        throw error;
    }

  }
}