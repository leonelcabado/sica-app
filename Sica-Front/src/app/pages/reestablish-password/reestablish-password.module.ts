import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReestablishPasswordPageRoutingModule } from './reestablish-password-routing.module';

import { ReestablishPasswordPage } from './reestablish-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReestablishPasswordPageRoutingModule
  ],
  declarations: [ReestablishPasswordPage]
})
export class ReestablishPasswordPageModule {}
