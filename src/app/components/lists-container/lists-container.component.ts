import { Component, OnInit } from '@angular/core';
import { Lista } from '../../models/lista.class';
import { ListsManagerService } from '../../services/lists-manager.service';

@Component({
  selector: 'app-lists-container',
  templateUrl: './lists-container.component.html',
  styleUrls: ['./lists-container.component.scss'],
})
export class ListsContainerComponent implements OnInit {
  listas: Lista[] = [];
  value = '';
  mostrarBuscador = false;
  mostrarCreador = false;
  constructor(public listsManagerService: ListsManagerService) {
    this.listas = this.listsManagerService.listas;
  }

  ngOnInit(): void {}

  filtrar(filtro) {
    if (filtro === '') {
      this.listas = this.listsManagerService.listas;
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
    this.listsManagerService.guardarListasLocalStorage(this.listas);
  }

  crearLista(nombre: string) {
    let nuevaLista = new Lista(nombre);
    this.listas.push(nuevaLista);
    this.listsManagerService.guardarListasLocalStorage(this.listas);
  }

  imprimirListas() {
    console.log(this.listsManagerService.listas);
  }
}
