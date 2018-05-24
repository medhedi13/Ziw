import {Component, Input,ViewChild} from '@angular/core';
import {NavController} from "ionic-angular";
import {BirdsPage} from "../../pages/birds/birds";
import {TabsPage} from "../../pages/tabs/tabs";
import {ListUserChatPage} from "../../pages/list-user-chat/list-user-chat";
import {CagesPage} from "../../pages/cages/cages";
import {PostPage} from "../../pages/post/post";


/**
 * Generated class for the SidebarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sidebar',
  templateUrl: 'sidebar.html'
})
export class SidebarComponent {
    @Input("idSide") testing;
    birdPage=BirdsPage;
    chat=ListUserChatPage;
    cages=CagesPage;
    myposts=PostPage;
  constructor(public navCtrl:NavController) {
  }
}