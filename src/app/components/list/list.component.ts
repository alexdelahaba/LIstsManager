import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() lista;
  @Input() indice;
  @Output() emisorIndiceEliminar = new EventEmitter<number>();
  datosLista = {
    elementosTotales: 0,
    elementosCompletados: 0,
    elementosRestantes: 0,
    porcentajeCompletado: 0,
  };
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.contarElementosLista(this.lista);
  }

  contarElementosLista(lista: any) {
    const totalCompletados = [];
    const totalElementos = [];

    lista.listasInternas.forEach((item) => {
      item.elementos.forEach((subItem) => {
        totalElementos.push(subItem);
        if (subItem.completado) {
          totalCompletados.push(subItem);
        }
      });
    });

    const elementosRestantes = totalElementos.length - totalCompletados.length;

    this.datosLista.elementosCompletados = totalCompletados.length;
    this.datosLista.elementosTotales = totalElementos.length;
    this.datosLista.elementosRestantes = elementosRestantes;
    this.datosLista.porcentajeCompletado =
      (totalCompletados.length / totalElementos.length) * 100;
  }

  openDialog(indice: number) {
    const dialogBorrarLista = this.dialog.open(DialogComponent);

    dialogBorrarLista.afterClosed().subscribe((result) => {
      if (result) {
        this.emisorIndiceEliminar.emit(indice);
      }
    });
  }
}
