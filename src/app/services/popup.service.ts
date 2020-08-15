import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private _snackBar: MatSnackBar) {}

  lanzarPopUp(mensaje: string) {
    this._snackBar.open(mensaje, 'Ok', {
      duration: 3000,
    });
  }
}
