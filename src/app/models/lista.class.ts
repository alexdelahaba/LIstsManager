import { ListaInterna } from './listaInterna.class';
export class Lista {
  id: number;
  listasInternas: ListaInterna[];
  nombre: string;
  personalizacion: {
    colorBotonPersonalizar: string;
    colorPersonalizado: string;
    iconoLista: string;
  };

  constructor(nombre: string) {
    this.nombre = nombre;
    this.id = new Date().getTime();
    this.listasInternas = [new ListaInterna()];
    this.personalizacion = {
      colorBotonPersonalizar: 'accent',
      colorPersonalizado: 'aliceblue',
      iconoLista: 'shop',
    };
  }
}
