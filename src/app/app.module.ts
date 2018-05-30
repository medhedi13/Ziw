import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPageModule} from '../pages/login/login.module';
import {BirdsPageModule} from '../pages/birds/birds.module';
import {RegisterPageModule} from '../pages/register/register.module';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthService} from '../providers/auth-service/auth-service';
import {IonicStorageModule} from '@ionic/storage';
import {ProfilePageModule} from '../pages/profile/profile.module';
import {NO_ERRORS_SCHEMA,} from '@angular/core';
import {ChatModule} from "../pages/chat/chat.module";
import {EmojiProvider} from '../providers/emoji/emoji';
import {ChatService} from '../providers/chat-service/chat-service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CagesPageModule} from "../pages/cages/cages.module";
import {ListUserChatPageModule} from "../pages/list-user-chat/list-user-chat.module";
import {BirdModalPageModule} from "../pages/bird-modal/bird-modal.module";

// File upload module
import {FileUploadModule} from 'ng2-file-upload';

// Cloudinary module
import {CloudinaryModule} from '@cloudinary/angular-5.x';
import {Cloudinary} from 'cloudinary-core';
import cloudinaryConfiguration from './config';
import {CageModalPageModule} from "../pages/cage-modal/cage-modal.module";
import {PostPageModule} from "../pages/post/post.module";

export const cloudinaryLib = {
    Cloudinary: Cloudinary
};

import {
    SocialLoginModule,
    AuthServiceConfig,
    FacebookLoginProvider,
} from "angular5-social-login";

export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider("856754984394109")
            },
        ]
    );
    return config;
}

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        FileUploadModule,
        CloudinaryModule.forRoot(cloudinaryLib, cloudinaryConfiguration),
        SocialLoginModule,
        BirdModalPageModule,
        BirdsPageModule,
        LoginPageModule,
        RegisterPageModule,
        ProfilePageModule,
        CagesPageModule,
        ListUserChatPageModule,
        CageModalPageModule,
        PostPageModule,
        ChatModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthService,
        IonicStorageModule,
        EmojiProvider,
        ChatService,
        HttpClient,
        HttpClientModule,
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
        }

    ]
})
export class AppModule {
}
