import { Elemento } from './elemento.class';
export class ListaInterna {
  nombre: string;
  elementos: Elemento[];
  id: number;
  constructor(nombre = 'Items', elementos = []) {
    this.nombre = nombre;
    this.elementos = elementos;
    this.id = new Date().getTime();
  }
}
