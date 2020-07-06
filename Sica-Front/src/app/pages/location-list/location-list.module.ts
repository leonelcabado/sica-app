import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { LocationListPage } from './location-list';
import { LocationListPageRoutingModule } from './location-list-routing.module';
import { ModalLocationNewPage } from '../modal-location-new/modal-location-new';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    LocationListPageRoutingModule
  ],
  declarations: [LocationListPage,ModalLocationNewPage],
  entryComponents: [
    ModalLocationNewPage
  ]
})
export class LocationListModule {}
