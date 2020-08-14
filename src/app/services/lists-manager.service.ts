import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.class';
import { fakeLists } from '../models/list.data';

@Injectable({
  providedIn: 'root',
})
export class ListsManagerService {
  listas: Lista[] = [];

  constructor() {
    this.listas = JSON.parse(localStorage.getItem('listasManager')) || [];
  }

  guardarListasLocalStorage(datos: Lista[]) {
    localStorage.setItem('listasManager', JSON.stringify(datos));
  }

  guardarUnaListaLocalStorage(lista: Lista) {
    const datosActuales = JSON.parse(localStorage.getItem('listasManager'));
    const listaBuscada = datosActuales.find((listaActual) => {
      return listaActual.id === lista.id;
    });
    const indiceLista = datosActuales.indexOf(listaBuscada);
    datosActuales[indiceLista] = lista;
    this.guardarListasLocalStorage(datosActuales);
  }
}
