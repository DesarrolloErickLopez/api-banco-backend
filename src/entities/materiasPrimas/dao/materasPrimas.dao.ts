import { DatabaseService } from '../../../database/services/database.service';

export class MateriasPrimasDao {
    constructor() {}

    static async obtenerMaateriasPrimas(): Promise<any> {
        let sql: string;
        
        try {
    
            sql = `
             SELECT mp.id, mp.nombre, mp.costo, mp.stock, mp.id_unidad, u.nombre_unidad FROM don_galleto.materias_primas AS mp
             JOIN don_galleto.unidades AS u ON mp.id_unidad = u.id_unidad;
            `;
    
            const result = await DatabaseService.executeQuery(sql);
            
            return result;
            
        } catch (error) {
            console.error('Error en MovimientosDao:', error);
            throw error;
        }
    
    }

    static async insertarMateriaPrima(nombre: string, costo: number, stock:number, id_unidad:number){
        let sql : string;
    
        try {
          
          sql = `INSERT INTO don_galleto.materias_primas(nombre, costo, stock, id_unidad) VALUES (?,?,?,?);`;
    
          const values = [nombre, costo, stock, id_unidad];
    
          const result : any = DatabaseService.executeQuery(sql, values);
    
          return result.affectedRows;
    
        } catch (error) {
          console.log(`Error al insertar dao: `, error);
          throw error;      
        }
      }

      
      static async actualizarMateriaPrima(id:string, nombre: string, costo: number, stock:number, id_unidad:number){
        let sql:string;
        let values:any = [];
        try {
          
    
            sql = `UPDATE don_galleto.materias_primas SET nombre = ?, costo = ?, stock = ?, id_unidad = ? WHERE id = ?;`;
            values = [nombre, costo, stock, id_unidad, id];
    
    
          const result : any = DatabaseService.executeQuery(sql, values);
    
          return result.affectedRows;
    
        } catch (error) {
          console.log(`Error al actualizar dao: `, error);
          throw error;
        }
      }
    
      static async eliminarMateriaPrima(id: number){
        let sql:string;
    
        try {
          
          sql = `DELETE FROM don_galleto.materias_primas WHERE id = ?`;
    
          const values = [id];
    
          const result : any = await DatabaseService.executeQuery(sql, values);
          
          return result.affectedRows;
    
        } catch (error) {
          console.log(`Error al insertar dao: `, error);
          throw error;      
        }
      }


}