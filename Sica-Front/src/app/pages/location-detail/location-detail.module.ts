import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationDetailPage } from './location-detail';
import { LocationDetailPageRoutingModule } from './location-detail-routing.module';
import { IonicModule } from '@ionic/angular';
import { ModalEditLocationPage } from '../modal-edit-location/modal-edit-location';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationDetailPageRoutingModule
  ],
  declarations: [
    LocationDetailPage, ModalEditLocationPage
  ],
  entryComponents: [
    ModalEditLocationPage
  ]
})
export class LocationDetailModule { }
