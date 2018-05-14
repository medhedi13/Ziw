import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListUserChatPage } from './list-user-chat';

@NgModule({
  declarations: [
    ListUserChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ListUserChatPage),
  ],
})
export class ListUserChatPageModule {}
