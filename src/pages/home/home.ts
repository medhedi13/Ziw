import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import { Storage } from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  posts: Array<object>;
  comment: String;

  constructor(public navCtrl: NavController, private http: HttpClient, private storage:Storage) {
    this.getPost();
    console.log(this.storage.get("token"));
    console.log(this.storage.get("userid"));
    this.comment = "";
  }

  addPost() {

    this.http.post('http://localhost:8081/api/publications', JSON.stringify({
      "content": this.comment,
      "user": "5ae07ee87840d81fe4b554b4",
      "likes": [{"user": "5ae07ee87840d81fe4b554b4"}],
      "photos": "url here"
    }), {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
  ).subscribe(res => {
      this.getPost();
    }, (err) => {
      console.log(err);
    });
  }

  getPost() {
      class resultData {
          data:Array<any>
      }
    this.http.get('http://localhost:8081/api/publications').subscribe((res:resultData) => {
      let data = res;
      this.posts = data.data;
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }
}
