import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'events/:event_id',
        loadChildren: () => import('../pages/event/event.module').then(m => m.EventPageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('../pages/events/events.modue').then(m => m.EventsPageModule)
      },
      {
        path: 'browse',
        loadChildren: () => import('../pages/browse/browse.module').then(m => m.BrowsePageModule)
      },
      {
        path: 'new-event',
        loadChildren: () => import('../pages/new_event/new_event.module').then(m => m.NewEventPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../pages/settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/events',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/events',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
