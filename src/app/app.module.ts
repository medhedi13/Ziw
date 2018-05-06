import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { IonicStorageModule } from '@ionic/storage';
import { ProfilePage } from '../pages/profile/profile';
import { NO_ERRORS_SCHEMA, } from '@angular/core';
import { SidebarComponent} from '../components/sidebar/sidebar'
import {Chat} from "../pages/chat/chat";
import { EmojiProvider } from '../providers/emoji/emoji';
import { ChatService } from '../providers/chat-service/chat-service';
import {HttpClient, HttpClientModule} from "@angular/common/http";


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
    Chat,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),

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
    Chat
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
    HttpClientModule



]
})
export class AppModule {}
