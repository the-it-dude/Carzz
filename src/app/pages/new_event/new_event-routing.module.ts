import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewEventPage } from './new_event.page';

const routes: Routes = [
  {
    path: '',
    component: NewEventPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewEventPageRoutingModule {}
