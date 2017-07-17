import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
// import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';

// declare var cordova: any;

// declare global {
//     interface Window { MyNamespace: any; }
// }

// window.MyNamespace = window.MyNamespace || {};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private Camera: Camera, private socialSharing: SocialSharing) {}

  captureDataUrl: string;

    private setOptions(srcType) {
        var cameraOptions = {
          quality: 50,
          destinationType: this.Camera.DestinationType.DATA_URL,
          encodingType: this.Camera.EncodingType.JPEG,
          mediaType: this.Camera.MediaType.PICTURE,
          sourceType: srcType
        }
        return cameraOptions;
    }

    // private createNewFileEntry(imgUri) {
    //     window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

    //         // JPEG file
    //         dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {

    //             // Do something with it, like write to it, upload it, etc.
    //             // writeFile(fileEntry, imgUri);
    //             console.log("got file: " + fileEntry.fullPath);
    //             // displayFileData(fileEntry.fullPath, "File copied to");

    //         }, onErrorCreateFile);

    //     }, onErrorResolveUrl);
    // }

    public capture() {
        var srcType = this.Camera.PictureSourceType.CAMERA;
        var cameraOptions = this.setOptions(srcType);

        this.Camera.getPicture(cameraOptions).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64:
          this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
          // Handle error
          console.log(err);
        });
      }

    public accessGallery(){
        var srcType = this.Camera.PictureSourceType.SAVEDPHOTOALBUM;
        var cameraOptions = this.setOptions(srcType);

        this.Camera.getPicture(cameraOptions).then((imageData) => {
            this.captureDataUrl = 'data:image/jpeg;base64,'+ imageData;
        }, (err) => {
            console.log(err);
        });
    }

    shareInfo()
    {
        this.socialSharing.share(null, null, this.captureDataUrl, null).
        then(() => {
            alert("Sharing success"); // Success!
        }).catch(() => {
            alert("Share failed"); // Error!
        });
    }

    // public openFilePicker() {

    //     var srcType = this.Camera.PictureSourceType.SAVEDPHOTOALBUM;
    //     var options = this.setOptions(srcType);
    //     // var func = this.createNewFileEntry;

    //     navigator.camera.getPicture(function cameraSuccess(imageUri) {

    //         // Do something

    //     }, function cameraError(error) {
    //         console.debug("Unable to obtain picture: " + error, "app");

    //     }, options);
    // }

}
