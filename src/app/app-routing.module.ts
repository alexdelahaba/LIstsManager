import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListManagerComponent } from './components/list-manager/list-manager.component';
import { ListsContainerComponent } from './components/lists-container/lists-container.component';
import { PersonalizarComponent } from './components/personalizar/personalizar.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'lista/:id', component: ListManagerComponent },
  { path: 'editar/:id', component: PersonalizarComponent },
  {
    path: 'listas',
    component: ListsContainerComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
