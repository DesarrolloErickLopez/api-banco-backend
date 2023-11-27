export class MovimientoModel {
    cantidad!: number;
    cuenta!: number;
    nip!: number;
    banco!: string;
    codigo_de_transaccion!: number;
    
    constructor(cantidad: number, cuenta: number, nip: number, banco: string, codigo_de_transaccion: number) {
      this.cantidad = cantidad;
      this.cuenta = cuenta;
      this.nip = nip;
      this.banco = banco;
      this.codigo_de_transaccion = codigo_de_transaccion;

    }
  }
  