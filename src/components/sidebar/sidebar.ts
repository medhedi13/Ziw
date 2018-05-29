import {Component, Input,ViewChild} from '@angular/core';
import {NavController} from "ionic-angular";
import {BirdsPage} from "../../pages/birds/birds";
import {TabsPage} from "../../pages/tabs/tabs";
import {ListUserChatPage} from "../../pages/list-user-chat/list-user-chat";
import {CagesPage} from "../../pages/cages/cages";
import {PostPage} from "../../pages/post/post";
import {HomePage} from "../../pages/home/home";
import {ProfilePage} from "../../pages/profile/profile";
import {AboutPage} from "../../pages/about/about";


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
    myhome=TabsPage;
    profile=ProfilePage;
    aboutus=AboutPage;
  constructor(public navCtrl:NavController) {
  }
  goHomePageFromTabs(){
      this.navCtrl.push(TabsPage,{id:1,menuLogin:false});
  }
}