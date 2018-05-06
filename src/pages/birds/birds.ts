import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {Headers, Http} from "@angular/http";
import {Storage} from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-birds',
  templateUrl: 'birds.html',
})
export class BirdsPage {
  birds = [];


  constructor( private http: Http, private storage: Storage) {
    this.getBirds();
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad BirdsPage');
  // };


  getBirds() {
    let self = this;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.storage.get("userid").then(function (userid) {
      self.http.get('http://localhost:8081/api/birds/user/' + userid).subscribe(res => {
        let data = res.json();
        self.birds = data.data;
        console.log(res.json());
      }, (err) => {
        console.log(err);
      });
    });
  }
  addBird(){

  }
}
