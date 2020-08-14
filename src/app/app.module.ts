import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListsContainerComponent } from './components/lists-container/lists-container.component';
import { ListComponent } from './components/list/list.component';

import { EditCardComponent } from './components/edit-card/edit-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListManagerComponent } from './components/list-manager/list-manager.component';
import { SublistComponent } from './components/sublist/sublist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ListsContainerComponent,
    ListComponent,
    DialogComponent,
    EditCardComponent,
    ListManagerComponent,
    SublistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
