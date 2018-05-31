import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BirdSalePage } from './bird-sale';

@NgModule({
  declarations: [
    BirdSalePage,
  ],
  imports: [
    IonicPageModule.forChild(BirdSalePage),
  ],
})
export class BirdSalePageModule {}
