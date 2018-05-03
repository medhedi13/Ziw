import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import { Storage } from '@ionic/storage';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  posts: Array<object>;
  comment: String;

  constructor(public navCtrl: NavController, private http: Http, private storage:Storage) {
    this.getPost();
    console.log(this.storage.get("token"));
    console.log(this.storage.get("userid"));
    this.comment = "";
  }

  addPost() {
    // this.showLoader();
    // this.loading.dismiss();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:8081/api/publications', JSON.stringify({
      "content": this.comment,
      "user": "5ae07ee87840d81fe4b554b4",
      "likes": [{"user": "5ae07ee87840d81fe4b554b4"}],
      "photos": "url here"
    }), {headers: headers}).subscribe(res => {
      console.log(res.json());
      this.getPost();
    }, (err) => {
      console.log(err);
    });
  }

  getPost() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.get('http://localhost:8081/api/publications').subscribe(res => {
      let data = res.json();
      this.posts = data.data;
      console.log(res.json());
    }, (err) => {
      console.log(err);
    });
  }
}
