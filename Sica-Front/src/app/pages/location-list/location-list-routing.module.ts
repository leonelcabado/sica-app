import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationListPage } from './location-list';
const routes: Routes = [
  {
    path: '',
    component: LocationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationListPageRoutingModule {}
