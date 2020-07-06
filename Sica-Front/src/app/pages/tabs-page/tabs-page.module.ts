import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { AboutModule } from '../about/about.module';
import { MapModule } from '../map/map.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { NotificationDetailModule } from '../notification-detail/notification-detail.module';
import { LocationDetailModule } from '../location-detail/location-detail.module';
import { LocationListModule } from '../location-list/location-list.module';
import { SondaDetailPageModule } from '../sonda-detail/sonda-detail.module';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    MapModule,
    ScheduleModule,
    NotificationDetailModule,
    LocationDetailModule,
    LocationListModule,
    SondaDetailPageModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
