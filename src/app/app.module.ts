import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {bird, BirdsPage} from '../pages/birds/birds';
import {RegisterPage} from '../pages/register/register';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthService} from '../providers/auth-service/auth-service';
import {IonicStorageModule} from '@ionic/storage';
import {ProfilePage} from '../pages/profile/profile';
import {NO_ERRORS_SCHEMA,} from '@angular/core';
import {SidebarComponent} from '../components/sidebar/sidebar'
import {Chat} from "../pages/chat/chat";
import {EmojiProvider} from '../providers/emoji/emoji';
import {ChatService} from '../providers/chat-service/chat-service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CagesPage} from "../pages/cages/cages";
import {ListUserChatPage} from "../pages/list-user-chat/list-user-chat";
import {BirdModalPage} from "../pages/bird-modal/bird-modal";

// File upload module
import {FileUploadModule} from 'ng2-file-upload';

// Cloudinary module
import {CloudinaryModule, CloudinaryConfiguration, provideCloudinary} from '@cloudinary/angular-5.x';
import * as cloudinary from 'cloudinary-core';
import cloudinaryConfiguration from './config';
import {CageModalPage} from "../pages/cage-modal/cage-modal";
import {PostPage} from "../pages/post/post";
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
        TabsPage,
        LoginPage,
        RegisterPage,
        ProfilePage,
        SidebarComponent,
        BirdsPage,
        CagesPage,
        Chat,
        ListUserChatPage,
        BirdModalPage,
        CageModalPage,
        PostPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        FileUploadModule,
        CloudinaryModule.forRoot(cloudinary, cloudinaryConfiguration),
        SocialLoginModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        LoginPage,
        RegisterPage,
        ProfilePage,
        BirdsPage,
        CagesPage,
        Chat,
        ListUserChatPage,
        BirdModalPage,
        CageModalPage,
        PostPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthService,
        IonicStorageModule,
        EmojiProvider,
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
