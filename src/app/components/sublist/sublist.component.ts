import { Component, OnInit, Input } from '@angular/core';
import { Elemento } from '../../models/elemento.class';
import { ListaInterna } from 'src/app/models/listaInterna.class';

@Component({
  selector: 'app-sublist',
  templateUrl: './sublist.component.html',
  styleUrls: ['./sublist.component.scss'],
})
export class SublistComponent implements OnInit {
  @Input() sublista: ListaInterna;
  @Input() ocultarCompletados;
  mostrarEdicion = false;
  constructor() {}

  ngOnInit(): void {}

  agregarElemento(elementoNombre) {
    if (elementoNombre === '') {
      return;
    }
    const nuevoElemento = new Elemento(elementoNombre);

    this.sublista.elementos.push(nuevoElemento);
  }

  eliminarElemento(itemLista) {
    this.sublista.elementos.splice(
      this.sublista.elementos.indexOf(itemLista),
      1
    );
  }
}
