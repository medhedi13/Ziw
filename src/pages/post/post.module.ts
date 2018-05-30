import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostPage } from './post';

import {FileUploadModule} from 'ng2-file-upload';
@NgModule({
  declarations: [
    PostPage,
  ],
  imports: [
      FileUploadModule,
    IonicPageModule.forChild(PostPage),
  ],
})
export class PostPageModule {}
