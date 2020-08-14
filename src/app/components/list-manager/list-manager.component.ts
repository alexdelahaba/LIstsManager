import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListaInterna } from 'src/app/models/listaInterna.class';
import { Lista } from '../../models/lista.class';
import { ListsManagerService } from '../../services/lists-manager.service';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss'],
})
export class ListManagerComponent implements OnInit {
  lista: Lista;
  ocultarCompletados = false;
  mostrarNuevaSublista = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private listsManagerService: ListsManagerService
  ) {
    this.lista = this.listsManagerService.listas[
      this.activatedRoute.snapshot.params.id
    ];
  }

  ngOnInit(): void {}

  agregarSublista(sublistaNombre: string) {
    if (sublistaNombre === '') {
      return;
    }
    this.lista.listasInternas.push(new ListaInterna(sublistaNombre));
  }
}
