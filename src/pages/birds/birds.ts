import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Headers, Http} from "@angular/http";
import {Storage} from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-birds',
  templateUrl: 'birds.html',
})
export class BirdsPage {
  birds = {};


  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private storage: Storage) {
    this.getBirds();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BirdsPage');
  };


  getBirds() {
    let self = this;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.storage.get("birdsID").then(function (birdsID) {
      self.http.get('http://localhost:8081/api/users/' + birdsID).subscribe(res => {
        let data = res.json();
        self.birds = data.data;
        console.log(res.json());
      }, (err) => {
        console.log(err);
      });
    });
  }
}
