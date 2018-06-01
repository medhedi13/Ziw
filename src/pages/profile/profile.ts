import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpHeaders, HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {FileUploader, FileUploaderOptions, ParsedResponseHeaders} from "ng2-file-upload";
import {Cloudinary} from "@cloudinary/angular-5.x";
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";

export class userObj {
    first_name: String;
    last_name: String;
    phone: String;
    email: String;
    city: String;
    avatar: String;
}

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    responses: Array<any>;
    private hasBaseDropZoneOver: boolean = false;
    private uploader: FileUploader;

    user: userObj;
    "fullname" = "loading...";

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private http: HttpClient,
                private storage: Storage,
                private cloudinary: Cloudinary,
                private alertCtrl: AlertController) {

        this.responses = [];
        this.readyUpload();

        this.user = new userObj();
        this.getUser();
    }


    readyUpload() {
        const uploaderOptions: FileUploaderOptions = {
            url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
            // Upload files automatically upon addition to upload queue
            autoUpload: true,
            // Use xhrTransport in favor of iframeTransport
            isHTML5: true,
            // Calculate progress independently for each uploaded file
            removeAfterUpload: true,
            // XHR request headers
            headers: [
                {
                    name: 'X-Requested-With',
                    value: 'XMLHttpRequest'
                }
            ]
        };
        this.uploader = new FileUploader(uploaderOptions);
        this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
            // Add Cloudinary's unsigned upload preset to the upload form
            form.append('upload_preset', this.cloudinary.config().upload_preset);
            // Add built-in and custom tags for displaying the uploaded photo in the list
            let tags = 'myphotoalbum';
            // Upload to a custom folder
            // Note that by default, when uploading via the API, folders are not automatically created in your Media Library.
            // In order to automatically create the folders based on the API requests,
            // please go to your account upload settings and set the 'Auto-create folders' option to enabled.
            form.append('folder', 'app');
            // Add custom tags
            form.append('tags', tags);
            // Add file to upload
            form.append('file', fileItem);

            // Use default "withCredentials" value for CORS requests
            fileItem.withCredentials = false;
            return {fileItem, form};
        };

        // Update model on completion of uploading a file
        this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
            let data = JSON.parse(response);
            this.user.avatar = data.url;
            console.log(item, status, data);
        };

    }

    getUser() {
        let self = this;

        class resultData {
            data: userObj
        }

        this.storage.get("userid").then(function (userID) {
            self.http.get('http://localhost:8081/api/users/' + userID).subscribe((res: resultData) => {
                self.user = res.data;
                self.fullname = self.user.first_name + " " + self.user.last_name;
            }, (err) => {
                console.log(err);
            });
        });

    }

    saveUser() {
        let self = this;
        this.storage.get("userid").then(function (userID) {
            self.http.put('http://localhost:8081/api/users/' + userID, JSON.stringify(self.user), {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }
            ).subscribe(res => {
                console.log(res);
                //
            }, (err) => {
                console.log(err);
            });
        });

    }

    presentConfirm() {
        let alert = this.alertCtrl.create({
            title: 'Comfirmation',
            message: 'Voulez vous vraiment desactiver votre compte?',
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
                        let self = this;
                        this.storage.get("userid").then(function (userID) {
                            self.http.delete("http://localhost:8081/api/users/" + userID).subscribe(function (res) {
                                self.navCtrl.setRoot(LoginPage);
                            });
                        });
                    }
                }
            ]
        });
        alert.present();
    }
}
