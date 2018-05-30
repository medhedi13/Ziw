import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BirdModalPage } from './bird-modal';
import {FileUploadModule} from 'ng2-file-upload';
@NgModule({
  declarations: [
    BirdModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BirdModalPage),
      FileUploadModule
  ],
})
export class BirdModalPageModule {}
