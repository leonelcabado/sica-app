import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotificationDetailPage } from './notification-detail';

const routes: Routes = [
  {
    path: '',
    component: NotificationDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionDetailPageRoutingModule { }
