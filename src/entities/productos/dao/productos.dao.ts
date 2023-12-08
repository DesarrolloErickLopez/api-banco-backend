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

  static async insertarProducto(nombre: string, imagen: string){
    let sql : string;

    try {
      
      sql = `INSERT INTO don_galleto.productos(nombre_producto, imagen) VALUES (?,?);`;

      const values = [nombre, imagen];

      const result : any = DatabaseService.executeQuery(sql, values);

      return result.affectedRows;

    } catch (error) {
      console.log(`Error al insertar dao: `, error);
      throw error;      
    }
  }

  static async actualizarProducto(id:string, nombre:string, imagen:string){
    let sql:string;
    let values:any = [];
    try {
      
      if(imagen != '' || imagen != null){
        sql = `UPDATE don_galleto.productos SET nombre_producto = ?, imagen = ? WHERE id_producto = ?`;
        values = [nombre, imagen, id];
      }else{
        sql = `UPDATE don_galleto.productos SET nombre_producto = ? WHERE id_producto = ?`;
        values = [nombre, id];
      }

      const result : any = DatabaseService.executeQuery(sql, values);

      return result.affectedRows;

    } catch (error) {
      console.log(`Error al actualizar dao: `, error);
      throw error;
    }
  }

  static async eliminarProducto(id: number){
    let sql:string;

    try {
      
      sql = `DELETE FROM don_galleto.productos WHERE id_producto = ?`;

      const values = [id];

      const result : any = await DatabaseService.executeQuery(sql, values);
      
      return result.affectedRows;

    } catch (error) {
      console.log(`Error al insertar dao: `, error);
      throw error;      
    }
  }

  static async obtenerVentas(){
    let sql: string; 
    try {
      sql = `SELECT v.id, v.id_producto, p.nombre_producto, p.imagen, v.id_unidad, uv.nombre_unidad, v.cantidad, v.total, v.fecha_venta FROM don_galleto.ventas AS v
      JOIN don_galleto.productos AS p ON v.id_producto = p.id_producto
      JOIN don_galleto.unidades AS uv ON v.id_unidad = uv.id_unidad;`;

      const result = await DatabaseService.executeQuery(sql);

      return result;
    } catch (error) {
      console.log("Error el insertar dao: ", error);
      throw error;
    }
  }
}