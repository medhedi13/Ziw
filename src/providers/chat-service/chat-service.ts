import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export class ChatMessage {
  messageId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  toUserId: string;
  time: number | string;
  message: string;
  status: string;
}

export class UserInfo {
  id: string;
  name?: string;
  avatar?: string;
}

@Injectable()
export class ChatService {

  constructor(private http: HttpClient,
              private events: Events) {
  }

  mockNewMsg(msg) {
    const mockMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: '210000198410281948',
      userName: 'Hancock',
      userAvatar: './assets/to-user.jpg',
      toUserId: '140000198202211138',
      time: Date.now(),
      message: msg.message,
      status: 'success'
    };

    setTimeout(() => {
      this.events.publish('chat:received', mockMsg, Date.now())
    }, Math.random() * 1800)
  }

  getMsgList(): Observable<ChatMessage[]> {
      const msgListUrl='http://localhost:8081/api/messages/5ab81fc29a3a6d17a8f257ee/5ab94d1571ce2e1cfccec79d';
    // const msgListUrl = './assets/mock/msg-list.json';
    return this.http.get<any>(msgListUrl)
      .pipe(map(response => response.array));
  }

  sendMsg(msg: ChatMessage) {
      this.http.post('http://localhost:8081/api/messages/',{
          content: msg.message,
          seen:false,
          sender:'5ab81fc29a3a6d17a8f257ee' ,
          recipient: '5ab94d1571ce2e1cfccec79d'
      }).subscribe(res => {
          console.log(res);
      }, (err) => {
          console.log(err);
      });
    return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
      .then(() => this.mockNewMsg(msg));
  }

  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      id: '5ab81fc29a3a6d17a8f257ee',
      name: 'Luff',
      avatar: './assets/user.jpg'
    };
    return new Promise(resolve => resolve(userInfo));
  }

}
