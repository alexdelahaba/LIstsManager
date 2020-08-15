import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListaInterna } from 'src/app/models/listaInterna.class';
import { Lista } from '../../models/lista.class';
import { ListsManagerService } from '../../services/lists-manager.service';
import { ERROR_COMPONENT_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss'],
})
export class ListManagerComponent implements OnInit {
  lista: Lista;
  sublistas: ListaInterna[] = [];
  ocultarCompletados = false;
  mostrarNuevaSublista = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private listsManagerService: ListsManagerService
  ) {
    this.lista = this.listsManagerService.listas[
      this.activatedRoute.snapshot.params.id
    ];
    this.sublistas = this.lista.listasInternas;
    console.log(this.sublistas);
  }

  ngOnInit(): void {}

  agregarSublista(sublistaNombre: string) {
    if (sublistaNombre === '') {
      return;
    }
    this.lista.listasInternas.push(new ListaInterna(sublistaNombre));
    this.listsManagerService.guardarUnaListaLocalStorage(this.lista);
  }

  borrarSublista(indiceSublistaABorrar: number) {
    // ERROR SE BORRAR LA PRIMERA LISTA
    console.log('recibiendo');
    debugger;
    const sublista = this.sublistas.find((sublista) => {
      return (sublista.id = indiceSublistaABorrar);
    });
    this.sublistas.splice(this.sublistas.indexOf(sublista), 1);
    this.listsManagerService.guardarUnaListaLocalStorage(this.lista);
  }
}
