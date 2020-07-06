import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SondaDetailPageRoutingModule } from './sonda-detail-routing.module';

import { SondaDetailPage } from './sonda-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SondaDetailPageRoutingModule
  ],
  declarations: [SondaDetailPage]
})
export class SondaDetailPageModule {}
