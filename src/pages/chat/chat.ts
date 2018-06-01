import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavParams} from 'ionic-angular';
import {Events, Content} from 'ionic-angular';
import {ChatService, ChatMessage, UserInfo} from "../../providers/chat-service/chat-service";

import {HttpClient} from "@angular/common/http";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class Chat {

    @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: ElementRef;
    msgList: ChatMessage[] = [];
    user: UserInfo;
    toUser: UserInfo;
    editorMsg = '';
    showEmojiPicker = false;
    exit = false;

    constructor(navParams: NavParams,
                private chatService: ChatService,
                private events: Events,
                private httpCtrl:HttpClient,
                private alertCtrl:AlertController) {
        // Get the navParams toUserId parameter
        this.toUser = {
            id: navParams.get('toUserId'),
            name: navParams.get('toUserName')
        };
        console.log(this.toUser);
        // Get mock user information
        this.chatService.getUserInfo()
            .then((res) => {
                this.user = res
            });
    }

    ionViewWillLeave() {
        // unsubscribe
        this.exit = true;
        this.events.unsubscribe('chat:received');
    }

    ionViewDidEnter() {
        //get message list
        // this.getMsg();
        this.refresh();

        // Subscribe to received  new message events
        this.events.subscribe('chat:received', msg => {
            this.pushNewMsg(msg);
        })
    }

    refresh() {
        let self = this;
        if (!this.exit) {
            setTimeout(() => {
                try {
                    if (!self.exit) {
                        self.getMsg();
                        self.refresh();
                    }
                } catch (e) {

                }
            }, 1000);
        }
        else
            console.log("9os le3ab");
    }

    onFocus() {
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    }

    switchEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
        if (!this.showEmojiPicker) {
            this.focus();
        } else {
            this.setTextareaScroll();
        }
        this.content.resize();
        this.scrollToBottom();
    }

    /**
     * @name getMsg
     * @returns {Promise<ChatMessage[]>}
     */
    getMsg() {
        // Get mock message list
        return this.chatService
            .getMsgList(this.user.id, this.toUser.id)
            .subscribe(res => {
                try {
                    this.msgList = res;
                    this.scrollToBottom();
                } catch (e) {
                    console.log(e);
                }
            });
    }

    /**
     * @name sendMsg
     */
    sendMsg() {
        if (!this.editorMsg.trim()) return;

        // Mock message
        const id = Date.now().toString();
        let newMsg: ChatMessage = {
            messageId: Date.now().toString(),
            userId: this.user.id,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.id,
            time: Date.now(),
            message: this.editorMsg,
            status: 'pending'
        };

        this.pushNewMsg(newMsg);
        this.editorMsg = '';

        if (!this.showEmojiPicker) {
            this.focus();
        }

        this.chatService.sendMsg(newMsg)
            .then(() => {
                let index = this.getMsgIndexById(id);
                if (index !== -1) {
                    this.msgList[index].status = 'success';
                }
            })
    }

    /**
     * @name pushNewMsg
     * @param msg
     */
    pushNewMsg(msg: ChatMessage) {
        const userId = this.user.id,
            toUserId = this.toUser.id;
        // Verify user relationships
        if (msg.userId === userId && msg.toUserId === toUserId) {

            // console.log(msg);
            this.msgList.push(msg);
        } else if (msg.toUserId === userId && msg.userId === toUserId) {

            this.msgList.push(msg);
        }
        this.scrollToBottom();
    }

    getMsgIndexById(id: string) {
        return this.msgList.findIndex(e => e.messageId === id)
    }

    scrollToBottom() {
        setTimeout(() => {
            if (this.content && this.content.scrollToBottom) {
                this.content.scrollToBottom();
            }
        }, 400)
    }

    private focus() {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    }

    private setTextareaScroll() {
        const textarea = this.messageInput.nativeElement;
        textarea.scrollTop = textarea.scrollHeight;
    }

    deleteMessage() {
        let alert = this.alertCtrl.create({
            title: 'Comfirmation ',
            message: 'Voulez vous vraiment Supprimer la conversation?',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Supprimer',
                    handler: () => {
                        this.httpCtrl.delete("http://localhost:8081/api/messages/"+this.user.id+"/"+this.toUser.id).subscribe(function () {

                        });
                    }
                }
            ]
        });
        alert.present();
    }
}
