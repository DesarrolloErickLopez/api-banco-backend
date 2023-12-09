import { DatabaseService } from '../../../database/services/database.service';

export class ProductosDao {
    constructor() {}

  static async obtenerProductos(): Promise<any> {
    let sql: string;
    
    try {

        sql = `
        SELECT p.id_producto, p.nombre_producto, u.nombre_unidad, up.precio, u.id_unidad
        FROM don_galleto.productos AS p
        JOIN don_galleto.unidades_por_producto AS up ON p.id_producto = up.id_producto
        JOIN don_galleto.unidades AS u ON up.id_unidad = u.id_unidad;
        `;

        const result = await DatabaseService.executeQuery(sql);
        
        return result;
        
    } catch (error) {
        console.error('Error en MovimientosDao:', error);
        throw error;
    }

  }

  static async registrarVenta(param: any): Promise<any> {
    let sql: string;
    // console.log(param);
    // return;
    try {

        sql = `
        INSERT INTO don_galleto.ventas
        (id_producto,id_unidad,cantidad,total,fecha_venta)
        VALUES(?,?,?,?, NOW());
        `;

        const values =[param.id_producto, param.id_unidad,param.cantidad,param.total];

        const result: any = await DatabaseService.executeQuery(sql, values);
        // console.log(result);
        if(result){
          return 1;
        }
        // return result.affectedRows;
        
    } catch (error) {
        console.error('Error en MovimientosDao:', error);
        throw error;
    }

  }

  static async obtenerUnProductos(id:number, idUnidad: number): Promise<any> {
    let sql: string;
    
    try {

        sql = `
        SELECT p.id_producto, p.nombre_producto, u.nombre_unidad, up.precio, u.id_unidad
        FROM don_galleto.productos AS p
        JOIN don_galleto.unidades_por_producto AS up ON p.id_producto = up.id_producto
        JOIN don_galleto.unidades AS u ON up.id_unidad = u.id_unidad WHERE p.id_producto = ? AND u.id_unidad = ?;
        `;

        const values =[id, idUnidad];

        const result = await DatabaseService.executeQuery(sql, values);
        
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
        SELECT u.id_unidad ,u.nombre_unidad, up.precio
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

  static async insertarProducto(nombre: string){
    let sql : string;

    try {
      
      sql = `INSERT INTO don_galleto.productos(nombre_producto, imagen) VALUES (?,?);`;

      const values = [nombre, ""];

      const result : any = DatabaseService.executeQuery(sql, values);

      return result.affectedRows;

    } catch (error) {
      console.log(`Error al insertar dao: `, error);
      throw error;      
    }
  }

  static async actualizarProducto(id:string, nombre: string, idUnidadEditar: number){
    let sql:string;
    let values:any = [];
    try {
      

        sql = `UPDATE don_galleto.productos AS p
        JOIN don_galleto.unidades_por_producto AS up ON p.id_producto = up.id_producto
        JOIN don_galleto.unidades AS u ON up.id_unidad = u.id_unidad
        SET don_galleto.p.nombre_producto = ?
        WHERE p.id_producto = ? AND u.id_unidad = ?`;
        values = [nombre, id, idUnidadEditar];

        console.log(sql)

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

  static async obtenerUnidades(){
    let sql: string; 
    try {
      sql = `SELECT * FROM don_galleto.unidades;`;

      const result = await DatabaseService.executeQuery(sql);

      return result;
    } catch (error) {
      console.log("Error el insertar dao: ", error);
      throw error;
    }
  }
}