import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Elemento } from '../../models/elemento.class';
import { ListaInterna } from 'src/app/models/listaInterna.class';
import { ListsManagerService } from '../../services/lists-manager.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-sublist',
  templateUrl: './sublist.component.html',
  styleUrls: ['./sublist.component.scss'],
})
export class SublistComponent implements OnInit {
  @Input() sublista: ListaInterna;
  @Input() ocultarCompletados;
  @Output() borrarSublistaEvento = new EventEmitter();

  mostrarEdicion = false;
  constructor(
    private listsManager: ListsManagerService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  agregarElemento(elementoNombre) {
    if (elementoNombre === '') {
      return;
    }
    const nuevoElemento = new Elemento(elementoNombre);
    this.sublista.elementos.push(nuevoElemento);
    console.log(this.sublista);
    this.guardarDatosActualizarSublita();
  }

  eliminarElemento(itemLista) {
    this.sublista.elementos.splice(
      this.sublista.elementos.indexOf(itemLista),
      1
    );
    console.log(this.sublista);
    this.guardarDatosActualizarSublita();
  }

  guardarDatosActualizarSublita() {
    this.listsManager.actualizarSublista(
      this.sublista,
      this.activatedRoute.snapshot.params.id
    );
  }

  imprimirlisat() {
    console.log(this.sublista);
  }

  marcarCompletado(itemLista, indice) {
    console.log(itemLista);
    console.log(indice);
    this.sublista.elementos[indice].completado = !this.sublista.elementos[
      indice
    ].completado;
    this.guardarDatosActualizarSublita();
  }

  borrarSublista() {
    const dialogBorrarLista = this.dialog.open(DialogComponent);

    dialogBorrarLista.afterClosed().subscribe((result) => {
      if (result) {
        this.borrarSublistaEvento.emit(this.sublista.id);
      }
    });
  }
}
