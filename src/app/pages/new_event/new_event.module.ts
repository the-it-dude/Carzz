import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewEventPage } from './new_event.page';


import { NewEventPageRoutingModule } from './new_event-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NewEventPageRoutingModule
  ],
  declarations: [NewEventPage]
})
export class NewEventPageModule {}
