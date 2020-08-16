import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as moment from 'moment';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ListsManagerService } from '../../services/lists-manager.service';
import * as firebase from 'firebase';
import { PopupService } from './../../services/popup.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('123456', [Validators.required]),
  });
  validez: moment.Moment = moment();
  constructor(
    public auth: AngularFireAuth,
    private fb: FormBuilder,
    private popUpService: PopupService,
    private router: Router,
    private listsManagerService: ListsManagerService
  ) {
    if (localStorage.getItem('emailListsManager')) {
      this.authForm.controls.email.setValue(
        localStorage.getItem('emailListsManager')
      );
    }
    this.validez = moment().add(1, 'h');
  }

  ngOnInit(): void {}

  login(authForm: FormGroup) {
    if (authForm.valid) {
      this.auth
        .signInWithEmailAndPassword(
          authForm.value.email,
          authForm.value.password
        )
        .then((resp: any) => {
          localStorage.setItem('emailListsManager', authForm.value.email);
          this.listsManagerService.guardarUid(resp.user.uid);
          this.listsManagerService.usuario = resp.user;
          sessionStorage.setItem('validHour', this.validez.toISOString());
          sessionStorage.setItem('esInvitado', 'false');
          this.listsManagerService.esInvitado = false;
          this.listsManagerService.auth = true;
          this.listsManagerService.getDatosDDBB(true);
        })
        .catch((err) => {
          console.log('ERROR');
          this.listsManagerService.guardarUid('ERROR');
          this.popUpService.lanzarPopUp(err.message);
        });
    }
  }

  logout() {
    this.auth.signOut();
  }

  esInvitado() {
    sessionStorage.setItem('validHour', this.validez.toISOString());
    this.listsManagerService.auth = false;
    this.listsManagerService.esInvitado = true;
    sessionStorage.setItem('esInvitado', 'true');
    this.router.navigateByUrl('/listas');
  }

  mandarMailContrasenia() {
    this.auth.sendPasswordResetEmail(this.authForm.value.email);
    this.popUpService.lanzarPopUp(
      'Se ha enviado un email a: ' + this.authForm.value.email
    );
  }
}
