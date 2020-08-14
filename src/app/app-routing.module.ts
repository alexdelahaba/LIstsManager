import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListManagerComponent } from './components/list-manager/list-manager.component';
import { ListsContainerComponent } from './components/lists-container/lists-container.component';
import { PersonalizarComponent } from './components/personalizar/personalizar.component';

const routes: Routes = [
  { path: 'lista/:id', component: ListManagerComponent },
  { path: 'edit/:id', component: PersonalizarComponent },
  { path: '', component: ListsContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
