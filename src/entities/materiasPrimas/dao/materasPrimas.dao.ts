import { DatabaseService } from '../../../database/services/database.service';

export class MateriasPrimasDao {
    constructor() {}

    static async obtenerMaateriasPrimas(): Promise<any> {
        let sql: string;
        
        try {
    
            sql = `
              SELECT p.id_producto, p.nombre_producto, u.nombre_unidad, p.precio FROM productos AS p
              JOIN unidades AS u ON p.id_unidad = u.id_unidad;;
            `;
    
            const result = await DatabaseService.executeQuery(sql);
            
            return result;
            
        } catch (error) {
            console.error('Error en MovimientosDao:', error);
            throw error;
        }
    
    }

}