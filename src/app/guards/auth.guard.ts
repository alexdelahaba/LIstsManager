import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
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
    if (this.listManager.auth || this.listManager.esInvitado) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
