import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationDetailPage } from './notification-detail';
import { SessionDetailPageRoutingModule } from './notification-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SessionDetailPageRoutingModule
  ],
  declarations: [
    NotificationDetailPage,
  ]
})
export class NotificationDetailModule { }
