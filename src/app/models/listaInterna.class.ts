import { Elemento } from './elemento.class';
export class ListaInterna {
  nombre: string;
  elementos: Elemento[];

  constructor(nombre = 'Items', elementos = []) {
    this.nombre = nombre;
    this.elementos = elementos;
  }
}
