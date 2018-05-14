import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpHeaders, HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
user =[];
  "fullname"="loading...";
 // testingLink=""
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private storage: Storage) {
    this.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getUser() {
    let self = this;
      class resultData {
          data:Array<any>
      }
    this.storage.get("userid").then(function (userID) {
      self.http.get('http://localhost:8081/api/users/' + userID).subscribe((res:resultData) => {

        let data = res;
        self.user = data.data;
        self.fullname="self.user.first_name"+ "+self.user.last_name";
      }, (err) => {
        console.log(err);
      });
    });

  }

  saveUser() {
    let self = this;
    this.storage.get("userid").then(function (userID) {
      self.http.put('http://localhost:8081/api/users/' + userID, JSON.stringify({
        first_name: "self.user.first_name",
        last_name: "self.user.last_name",
        phone: "self.user.phone",
        email: "self.user.email",
        city: "self.user.city"
      }), {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      }
    ).subscribe(res => {
        console.log(res);
        //
      }, (err) => {
        console.log(err);
      });
    });

  }

}
