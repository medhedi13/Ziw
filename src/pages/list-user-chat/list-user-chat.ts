import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Chat} from "../chat/chat";

/**
 * Generated class for the ListUserChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-user-chat',
  templateUrl: 'list-user-chat.html',
})
export class ListUserChatPage {
    users=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient,private nav:NavController) {
      this.getUsers();
  }
  getUsers(){

      class resultData {
          data:Array<any>
      }
      this.http.get("http://localhost:8081/api/users/").subscribe((res:resultData)=>{
          console.log(res);
          this.users=res.data;
      });
  }
  openUserChat(id,name){
      this.nav.push(Chat,{toUserId:id,toUserName:name});
  }

}
