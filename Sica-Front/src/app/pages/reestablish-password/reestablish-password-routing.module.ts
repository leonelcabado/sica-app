import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReestablishPasswordPage } from './reestablish-password.page';

const routes: Routes = [
  {
    path: '',
    component: ReestablishPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReestablishPasswordPageRoutingModule {}
