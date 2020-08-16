import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.class';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ListsManagerService {
  listas: Lista[] = [];
  uid: string = '';
  auth = false;
  usuario: any;
  esInvitado = false;
  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    public authFirebase: AngularFireAuth,
    private router: Router
  ) {
    this.checkDatosLocales();
  }

  guardarEsqueletoLocalStorage() {}

  guardarListasLocalStorage(datos: Lista[]) {
    this.listas = datos;
    localStorage.setItem('listasManager', JSON.stringify(datos));
    localStorage.setItem('fechaUltimaActualizacion', moment().toISOString());
  }

  guardarUnaListaLocalStorage(lista: Lista) {
    debugger;
    const datosActuales = JSON.parse(localStorage.getItem('listasManager'));
    const listaBuscada = datosActuales.find((listaActual) => {
      return listaActual.id === lista.id;
    });
    const indiceLista = datosActuales.indexOf(listaBuscada);
    datosActuales[indiceLista] = lista;
    this.guardarListasLocalStorage(datosActuales);
  }

  getDatosDDBB(redirect: boolean) {
    if (this.saberSiInvitado()) {
      return;
    }
    let identificadorDatos;
    if (localStorage.getItem('emailListsManager')) {
      identificadorDatos = localStorage
        .getItem('emailListsManager')
        .split('@')[0];
    } else {
      sessionStorage.setItem('esInvitado', 'true');
      return;
    }
    this.fechaLocalMayor(identificadorDatos).subscribe((action: any) => {
      const fechaLocal = localStorage.getItem('fechaUltimaActualizacion') || 0;
      console.log(action.payload.val());
      const fechaFirebase = action.payload.val();
      if (!action.payload.val() || fechaLocal > fechaFirebase) {
        this.getDatosLocalStorage();
      } else {
        this.db
          .object('data/' + identificadorDatos + '/datos')
          .snapshotChanges()
          .subscribe((action: any) => {
            console.log(action.payload.val());
            if (action.payload.val()) {
              this.guardarListasLocalStorage(JSON.parse(action.payload.val()));
              this.listas = JSON.parse(action.payload.val());
            } else {
              this.listas = [];
            }
          });
      }
      if (redirect) {
        this.router.navigateByUrl('/listas');
      }
    });
  }

  getDatosLocalStorage() {
    this.listas = JSON.parse(localStorage.getItem('listasManager'));
  }

  checkDatosLocales() {
    if (localStorage.getItem('listasManager')) {
      this.listas = JSON.parse(localStorage.getItem('listasManager'));
    } else {
      this.getDatosDDBB(false);
    }
  }

  setDatosDDBB() {
    if (this.saberSiInvitado()) {
      return;
    }
    const datos = localStorage.getItem('listasManager');
    const identificadorDatos = localStorage
      .getItem('emailListsManager')
      .split('@')[0];
    const fechaUltimaActualizacion = moment().toISOString();
    this.db.object('data/' + identificadorDatos).set({
      datos,
      fechaUltimaActualizacion,
    });
  }

  saberSiInvitado() {
    if (this.esInvitado || sessionStorage.getItem('esInvitado') === 'true') {
      return true;
    } else {
      return false;
    }
  }

  guardarUid(uid: string) {
    sessionStorage.setItem('uid', uid);
    this.uid = uid;
    this.auth = true;
  }

  actualizarSublista(sublistaInterna, indice) {
    const sublistaObjetivo = this.listas[indice].listasInternas.find(
      (sublistaBuscada) => {
        return sublistaBuscada.id === sublistaInterna.id;
      }
    );

    const indiceAModificar = this.listas[indice].listasInternas.indexOf(
      sublistaObjetivo
    );
    this.listas[indice].listasInternas[indiceAModificar] = sublistaInterna;
    this.guardarUnaListaLocalStorage(this.listas[indice]);
  }

  fechaLocalMayor(identificadorDatos: string) {
    return this.db
      .object('data/' + identificadorDatos + '/fechaUltimaActualizacion')
      .snapshotChanges();
  }
}
