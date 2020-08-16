import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import * as moment from 'moment';

import { ListsManagerService } from '../services/lists-manager.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private listManager: ListsManagerService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('guarda');
    const testEntrada = this.listManager.auth || this.listManager.esInvitado;
    const testHora = moment(sessionStorage.getItem('validHour')) > moment();
    if (testEntrada || testHora) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
