import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import Moment from 'moment';
import {Storage} from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FileUploader, FileUploaderOptions, ParsedResponseHeaders} from "ng2-file-upload";
import {Cloudinary} from "@cloudinary/angular-5.x";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    responses: Array<any>;
    private hasBaseDropZoneOver: boolean = false;
    private uploader: FileUploader;

    posts: Array<object>;
    comment: String;
    photoPost='';

    constructor(public navCtrl: NavController,
                private http: HttpClient,
                private storage: Storage,
                private cloudinary: Cloudinary) {
        this.getPost();
        console.log(this.storage.get("token"));
        console.log(this.storage.get("userid"));
        this.comment = "";
        this.responses = [];
        this.readyUpload();
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
            this.photoPost = data.url;
            console.log(item, status, data);
        };

    }

    addPost() {
        let self=this;
        self.storage.get("userid").then(function (userid) {

            self.http.post('http://localhost:8081/api/publications', JSON.stringify({
                    "content": self.comment,
                    "user": userid,
                    "likes": [],
                    "photos": self.photoPost,
                    "avatar":[]
                }), {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }
            ).subscribe(res => {
                self.getPost();
                self.comment="";
                self.photoPost="";
            }, (err) => {
                console.log(err);
            });
        })
    }

    getPost() {
        class resultData {
            data: Array<any>
        }

        this.http.get('http://localhost:8081/api/publications').subscribe((res: resultData) => {
            let data = res;
            this.posts = data.data;
            console.log(res);
        }, (err) => {
            console.log(err);
        });
    }

    humanDate(str) {
        return Moment(str).fromNow();
    }

    like(id) {
        let self = this;
        self.storage.get("userid").then(function (userid) {
            self.http.post('http://localhost:8081/api/publications/like/' + id, JSON.stringify({
                userid: userid
            }), {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }).subscribe(function (result) {
                self.getPost();
            })
        })
    }
}
