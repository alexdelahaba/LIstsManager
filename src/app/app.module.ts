import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListsContainerComponent } from './components/lists-container/lists-container.component';
import { ListComponent } from './components/list/list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListManagerComponent } from './components/list-manager/list-manager.component';
import { SublistComponent } from './components/sublist/sublist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { PersonalizarComponent } from './components/personalizar/personalizar.component';
import { AuthComponent } from './components/auth/auth.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    ListsContainerComponent,
    ListComponent,
    DialogComponent,

    ListManagerComponent,
    SublistComponent,
    PersonalizarComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
