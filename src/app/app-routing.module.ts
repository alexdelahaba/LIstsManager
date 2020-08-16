import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListManagerComponent } from './components/list-manager/list-manager.component';
import { ListsContainerComponent } from './components/lists-container/lists-container.component';
import { PersonalizarComponent } from './components/personalizar/personalizar.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'LIstsManager', component: AuthComponent },
  { path: '', redirectTo: '/LIstsManager', pathMatch: 'full' },
  {
    path: 'lista/:id',
    component: ListManagerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editar/:id',
    component: PersonalizarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listas',
    component: ListsContainerComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
