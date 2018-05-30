import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {Chat} from "./chat";
import {ChatService} from "../../providers/chat-service/chat-service";
import {EmojiPickerComponentModule} from "../../components/emoji-picker/emoji-picker.module";
import {EmojiProvider} from "../../providers/emoji/emoji";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
    declarations: [
        Chat
    ],
    imports: [
        EmojiPickerComponentModule,
        IonicPageModule.forChild(Chat),
        PipesModule
    ],
    exports: [
        Chat
    ],
    providers: [
        ChatService,
        EmojiProvider
    ]
})
export class ChatModule {
}
