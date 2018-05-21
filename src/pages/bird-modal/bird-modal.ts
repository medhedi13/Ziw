import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Storage} from "@ionic/storage";
import {Cloudinary} from '@cloudinary/angular-5.x';

import {FileUploader, FileUploaderOptions, ParsedResponseHeaders} from 'ng2-file-upload';

/**
 * Generated class for the BirdModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class bird {
    _id: String;
    ring: String;
    name: String;
    family: String;
    birth: String;
    description: String;
    Photo: Array<any>;
    owner: String;
    photos:String
}

@IonicPage()
@Component({
    selector: 'page-bird-modal',
    templateUrl: 'bird-modal.html',
})
export class BirdModalPage {

    responses: Array<any>;

    private hasBaseDropZoneOver: boolean = false;
    private uploader: FileUploader;

    bird: bird;
    addBirdBtn = true;
    familys = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                private storage: Storage,
                private http: HttpClient,
                private cloudinary: Cloudinary) {
        this.responses = [];
        this.readyUpload();
        this.bird = new bird();
        this.bird.photos="https://i.ytimg.com/vi/XaeEKb6SLX4/maxresdefault.jpg";
        this.getFamily();
        this.addBirdBtn = true;
        if (navParams.get('bird')) {
            this.addBirdBtn = false;
            this.bird = navParams.get('bird');
        }
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
        this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>{
            let data=JSON.parse(response);
            this.bird.photos=data.url;
          console.log(item,status,data);
        };

    }


    getFamily() {
        class resultData {
            data: Array<any>
        }

        this.http.get('http://localhost:8081/api/familys').subscribe((res: resultData) => {
            this.familys = res.data;
            console.log(res);
        }, (err) => {
            console.log(err);
        });
    }

    dismiss() {
        let data = {'foo': 'bar'};
        this.viewCtrl.dismiss(data);
    }

    addBird() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        let self = this;
        this.storage.get("userid").then(function (userID) {
            self.bird.owner = userID;
            if (self.addBirdBtn) {
                self.http.post('http://localhost:8081/api/birds/', JSON.stringify(self.bird),
                    httpOptions).subscribe(res => {
                    console.log(res);
                    //TODO self.getBirds();
                    self.dismiss();
                }, (err) => {
                    console.log(err);
                });
            } else {
                self.http.put('http://localhost:8081/api/birds/' + self.bird._id, JSON.stringify(self.bird),
                    httpOptions).subscribe(res => {
                    console.log(res);
                    //TODO self.getBirds();
                    self.dismiss();
                    //
                }, (err) => {
                    console.log(err);
                });
            }
        });
    }
}
