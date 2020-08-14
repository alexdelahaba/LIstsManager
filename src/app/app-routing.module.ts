import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListManagerComponent } from './components/list-manager/list-manager.component';
import { ListsContainerComponent } from './components/lists-container/lists-container.component';

const routes: Routes = [
  { path: 'lista/:id', component: ListManagerComponent },
  { path: '', component: ListsContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
