import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { SchedulePage } from '../schedule/schedule';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'schedule',
        children: [
          {
            path: '',
            component: SchedulePage,
          },
          {
            path: 'notification/:notificationId',
            loadChildren: () => import('../notification-detail/notification-detail.module').then(m => m.NotificationDetailModule)
          }
        ]
      },
      {
        path: 'locations',
        children: [
          {
            path: '',
            loadChildren: () => import('../location-list/location-list.module').then(m => m.LocationListModule)
          },
          {
            path: 'notification/:notificationId',
            loadChildren: () => import('../notification-detail/notification-detail.module').then(m => m.NotificationDetailModule)
          },
          {
            path: 'location-details/:locationId',
            loadChildren: () => import('../location-detail/location-detail.module').then(m => m.LocationDetailModule)
          },
          {
            path: 'sonda-detail/:sondaId',
            loadChildren: () => import('../sonda-detail/sonda-detail.module').then( m => m.SondaDetailPageModule)
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () => import('../map/map.module').then(m => m.MapModule)
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/schedule',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

