import { Component, OnInit } from '@angular/core';
import { fakeLists } from '../../models/list.data';
import { Lista } from '../../models/lista.class';

@Component({
  selector: 'app-lists-container',
  templateUrl: './lists-container.component.html',
  styleUrls: ['./lists-container.component.scss'],
})
export class ListsContainerComponent implements OnInit {
  listas: any = [];
  value = '';
  mostrarBuscador = false;
  mostrarCreador = false;
  constructor() {
    this.listas = fakeLists;
  }

  ngOnInit(): void {}

  filtrar(filtro) {
    if (filtro === '') {
      this.listas = fakeLists;
      return;
    }
    this.listas = this.listas.filter((item) => {
      return item.nombre.toLowerCase().includes(filtro);
    });
  }

  eliminarLista(id: number) {
    this.listas = this.listas.filter((lista) => {
      return lista.id !== id;
    });
  }

  showListas() {
    console.log(this.listas);
  }

  crearLista(nombre: string) {
    // console.log(this.listas);
    let nuevaLista = new Lista(nombre);

    this.listas.push(nuevaLista);
  }
}
