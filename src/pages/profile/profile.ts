import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Headers, Http} from "@angular/http";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
user :any;
  fullname="loading...";
 // testingLink=""
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private storage: Storage) {
    this.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getUser() {
    let self = this;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.storage.get("userid").then(function (userID) {
      self.http.get('http://localhost:8081/api/users/' + userID).subscribe(res => {

        let data = res.json();
        self.user = data.data;
        self.fullname=self.user.first_name+" "+self.user.last_name;
        // this.sanitization.bypassSecurityTrustStyle(`url(${element.image})`);
        console.log(res.json());
      }, (err) => {
        console.log(err);
      });
    });

  }

  saveUser() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let self = this;
    this.storage.get("userid").then(function (userID) {
      self.http.put('http://localhost:8081/api/users/' + userID, JSON.stringify({
        first_name: self.user.first_name,
        last_name: self.user.last_name,
        phone: self.user.phone,
        email: self.user.email,
        city: self.user.city
      }), {headers: headers}).subscribe(res => {
        console.log(res.json());
        //
      }, (err) => {
        console.log(err);
      });
    });

  }

}
