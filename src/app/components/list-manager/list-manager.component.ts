import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fakeLists } from '../../models/list.data';
import { ListaInterna } from 'src/app/models/listaInterna.class';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss'],
})
export class ListManagerComponent implements OnInit {
  lista: any;
  ocultarCompletados = false;
  mostrarNuevaSublista = false;
  constructor(private activatedRoute: ActivatedRoute) {
    this.lista = fakeLists[this.activatedRoute.snapshot.params.id];
  }

  ngOnInit(): void {}

  agregarSublista(sublistaNombre: string) {
    if (sublistaNombre === '') {
      return;
    }
    this.lista.listasInternas.push(new ListaInterna(sublistaNombre));
  }
}
