import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.class';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
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
    public authFirebase: AngularFireAuth
  ) {
    this.listas = JSON.parse(localStorage.getItem('listasManager')) || [];
  }

  guardarListasLocalStorage(datos: Lista[]) {
    this.listas = datos;
    localStorage.setItem('listasManager', JSON.stringify(datos));
  }

  guardarUnaListaLocalStorage(lista: Lista) {
    const datosActuales = JSON.parse(localStorage.getItem('listasManager'));
    const listaBuscada = datosActuales.find((listaActual) => {
      return listaActual.id === lista.id;
    });
    const indiceLista = datosActuales.indexOf(listaBuscada);
    datosActuales[indiceLista] = lista;
    this.guardarListasLocalStorage(datosActuales);
  }

  getDatosDDBB(resp: auth.UserCredential) {
    if (this.saberSiInvitado()) {
      return;
    }
    console.log(resp);
    const identificadorDatos = localStorage
      .getItem('emailListsManager')
      .split('@')[0];
    if (this.auth && this.uid.length > 10) {
      this.db
        .object('data/' + identificadorDatos)
        .snapshotChanges()
        .subscribe((action: any) => {
          console.log(action.payload.val());
          if (action.payload.val()) {
            this.listas = JSON.parse(action.payload.val());
          } else {
            this.listas = [];
          }
        });
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
    this.db.object('data/' + identificadorDatos).set({
      datos,
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
    console.log(sublistaInterna, indice);
    console.log('recibiendo emision');
    console.log(this.listas);
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
}
