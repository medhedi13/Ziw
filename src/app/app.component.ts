import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {Chat} from "../pages/chat/chat";
import {CagesPage} from "../pages/cages/cages";
import {TabsPage} from "../pages/tabs/tabs";
import {BirdsPage} from "../pages/birds/birds";
import {ListUserChatPage} from "../pages/list-user-chat/list-user-chat";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
