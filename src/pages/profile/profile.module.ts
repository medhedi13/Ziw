import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';

import {FileUploadModule} from 'ng2-file-upload';
@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [FileUploadModule,
    IonicPageModule.forChild(ProfilePage),
  ],
})
export class ProfilePageModule {}
