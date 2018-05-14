import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';
import {map} from 'rxjs/operators/map';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Storage} from "@ionic/storage";

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
                private events: Events, private storage: Storage) {
    }

    mockNewMsg(msg) {
        const mockMsg: ChatMessage = {
            messageId: Date.now().toString(),
            userId: '5abb708e05169975385ff347',
            userName: 'Hancock',
            userAvatar: './assets/to-user.jpg',
            toUserId: '5ab94d1571ce2e1cfccec79d',
            time: Date.now(),
            message: msg,
            status: 'success'
        };

        setTimeout(() => {
            this.events.publish('chat:received', mockMsg, Date.now())
        }, Math.random() * 1800)
    }

    getMsgList(UserID, toUserID): Observable<ChatMessage[]> {
        const msgListUrl = 'http://localhost:8081/api/messages/' + UserID + '/' + toUserID;
        // this.allAjax();
        return this.http.get<any>(msgListUrl)
            .pipe(map(response => response.array));

    }

    allAjax() {
        console.log("testing");
        this.mockNewMsg("3asba liha");
        let self=this;
        setTimeout(()=>{

            self.allAjax()
        }, 1000);
    }

    sendMsg(msg: ChatMessage) {
        this.http.post('http://localhost:8081/api/messages/', {
            content: msg.message,
            seen: false,
            sender: msg.userId,
            recipient: msg.toUserId
        }).subscribe(res => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
        return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
            .then(() => this.mockNewMsg(msg));
    }

    getUserInfo(): Promise<UserInfo> {

        return new Promise(resolve => {
            this.storage.get('userid').then(userid => {

                const userInfo: UserInfo = {
                    id: userid,
                    name: 'Luff',
                    avatar: './assets/user.jpg'
                };
                resolve(userInfo)
            });
        });
    }

}
