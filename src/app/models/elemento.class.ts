export class Elemento {
  nombre: string;
  completado: boolean;
  id: number;
  constructor(nombre, completado = false) {
    this.nombre = nombre;
    this.completado = completado;
    this.id = new Date().getTime();
  }
}
