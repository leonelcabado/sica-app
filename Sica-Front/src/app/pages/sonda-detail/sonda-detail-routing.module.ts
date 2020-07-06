import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SondaDetailPage } from './sonda-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SondaDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SondaDetailPageRoutingModule {}
