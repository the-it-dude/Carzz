import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventsPage } from './events.page';

import { EventsPageRoutingModule } from './events-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    EventsPageRoutingModule
  ],
  declarations: [EventsPage]
})
export class EventsPageModule {}
