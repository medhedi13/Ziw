import {Component, ViewChild} from '@angular/core';
import {Platform, NavController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {Chat} from "../pages/chat/chat";
import {CagesPage} from "../pages/cages/cages";
import {TabsPage} from "../pages/tabs/tabs";
import {BirdsPage} from "../pages/birds/birds";
import {ListUserChatPage} from "../pages/list-user-chat/list-user-chat";
import {ProfilePage} from "../pages/profile/profile";
import {PostPage} from "../pages/post/post";
import {AboutPage} from "../pages/about/about";
import {CouplesPage} from "../pages/couples/couples";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = TabsPage;

    birdPage = BirdsPage;
    chat = ListUserChatPage;
    cages = CagesPage;
    myposts = PostPage;
    myhome = TabsPage;
    profile = ProfilePage;
    aboutus = AboutPage;
    couples=CouplesPage;
    @ViewChild('contentRoot') content: NavController;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    openPage(page, params?: any) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.content.setRoot(page, params);
        // if(document.querySelectorAll(".tabbar").length>0)
        // {
        //     let x=document.querySelectorAll(".tabbar")[0];
        //     if(x.className.indexOf("show-tabbar")==-1)
        //         x.className+=" show-tabbar";
        // }
    }
}
