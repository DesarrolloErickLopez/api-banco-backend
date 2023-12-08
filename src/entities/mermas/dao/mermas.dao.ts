import { DatabaseService } from '../../../database/services/database.service';

export class MermasDao {
    constructor() {}

    static async obtenerMermas(): Promise<any> {
        let sql: string;
        
        try {
    
            sql = `
            SELECT m.id, m.id_producto, p.nombre_producto, m.monto_mermado, m.id_unidad, u.nombre_unidad, m.causa FROM don_galleto.mermas AS m
            JOIN don_galleto.productos AS p ON m.id_producto = p.id_producto
            JOIN don_galleto.unidades AS u ON m.id_unidad = u.id_unidad;
            `;
    
            const result = await DatabaseService.executeQuery(sql);
            
            return result;
            
        } catch (error) {
            console.error('Error en MovimientosDao:', error);
            throw error;
        }
    
    }

    static async insertarMermas(id_producto: number, monto_mermado:number, id_unidad: number, causa : string){
        let sql : string;
    
        try {
          
          sql = `INSERT INTO don_galleto.mermas (id_producto, monto_mermado, id_unidad, causa) VALUES(?,?,?,?);`;
    
          const values = [id_producto, monto_mermado, id_unidad, causa];
    
          const result : any = DatabaseService.executeQuery(sql, values);
    
          return result.affectedRows;
    
        } catch (error) {
          console.log(`Error al insertar dao: `, error);
          throw error;      
        }
      }

      
      static async actualizarMermas(id:string, id_producto: number, monto_mermado:number, id_unidad: number, causa : string){
        let sql:string;
        let values:any = [];
        try {
          
    
            sql = `UPDATE don_galleto.mermas SET id_producto = ?, monto_mermado = ?, id_unidad = ?, causa = ? WHERE id = ?;`;
            values = [id_producto, monto_mermado, id_unidad, causa, id];
    
    
          const result : any = DatabaseService.executeQuery(sql, values);
    
          return result.affectedRows;
    
        } catch (error) {
          console.log(`Error al actualizar dao: `, error);
          throw error;
        }
      }
    
      static async eliminarMermas(id: number){
        let sql:string;
    
        try {
          
          sql = `DELETE FROM don_galleto.mermas WHERE id = ?;`;
    
          const values = [id];
    
          const result : any = await DatabaseService.executeQuery(sql, values);
          
          return result.affectedRows;
    
        } catch (error) {
          console.log(`Error al insertar dao: `, error);
          throw error;      
        }
      }
}