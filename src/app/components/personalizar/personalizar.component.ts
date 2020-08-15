import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { iconosEjemplo } from '../../models/icons.data';
import { Lista } from '../../models/lista.class';
import { ListsManagerService } from './../../services/lists-manager.service';
import { PopupService } from './../../services/popup.service';

@Component({
  selector: 'app-personalizar',
  templateUrl: './personalizar.component.html',
  styleUrls: ['./personalizar.component.scss'],
})
export class PersonalizarComponent implements OnInit {
  lista: Lista;
  indice: number;
  pruebas: any;
  listaIconos = iconosEjemplo;
  constructor(
    private activatedRoute: ActivatedRoute,
    private listsManagerService: ListsManagerService,
    private popUpService: PopupService,
    private router: Router
  ) {
    this.indice = Number(this.activatedRoute.snapshot.params.id);
  }

  ngOnInit(): void {
    this.lista = this.listsManagerService.listas[
      this.activatedRoute.snapshot.params.id
    ];
  }

  guardarCambios() {
    this.popUpService.lanzarPopUp('Cambios guardados');
    this.listsManagerService.guardarUnaListaLocalStorage(this.lista);
    this.router.navigateByUrl('/listas');
  }
}
