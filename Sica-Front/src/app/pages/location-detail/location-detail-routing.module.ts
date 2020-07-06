import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationDetailPage } from './location-detail';

const routes: Routes = [
  {
    path: '',
    component: LocationDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationDetailPageRoutingModule { }
