import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera'; 
import * as firebase from 'firebase';
import { Rooms } from '../../rooms';
/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  myphoto: string;
  room = {} as Rooms;
  storageRef = firebase.storage().ref();
  addRooms =  firebase.database().ref('rooms/');

  constructor(public navCtrl: NavController,
    private camera: Camera, 
    public navParams: NavParams,
    public loading: LoadingController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  takePhoto(sourcetype: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: sourcetype,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetHeight: 500,
      targetWidth: 500
    }
    
    this.camera.getPicture(options).then((myphoto) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let imageUploaded = 'data:image/jpeg;base64,' + myphoto;
     
     this.myphoto = imageUploaded;
     
    }, (err) => {
     // Handle error
    });
  }

  upload() {
    let loaders = this.loading.create({
      content: 'Uploading, Please wait...',
      duration: 3000
    })
    let storageRef = firebase.storage().ref();
​
    const filename = Math.floor(Date.now() / 1000);
​
    const imageRef = storageRef.child(`my-rooms/${filename}.jpg`);
    loaders.present()
    imageRef.putString(this.myphoto, firebase.storage.StringFormat.DATA_URL)
    .then((snapshot) => {
      console.log('image uploaded');
      this.myphoto = snapshot.downloadURL
      let alert = this.alertCtrl.create({
        title: 'Image Upload', 
        subTitle: 'Image Uploaded to firebase',
        buttons: ['Ok']
      }).present();
    })
  }

  createRooms(room: Rooms) {
    this.upload()
    let alert = this.alertCtrl.create({
      title: 'adding a Hotel',
      subTitle: 'successfully added!',
      buttons: ['Ok']
    })
   if(this.myphoto != '') {
     let newRooms = this.addRooms.push();
   newRooms.set({
     RoomType: room.roomtype,
     Price: room.price,
     Description: room.description,
     image: this.myphoto
   });
    this.room.price = null;
    this.room.roomtype = '';
    this.room.description = '';
   alert.present();
   //this.navCtrl.setRoot();
   }else {
    let alert = this.alertCtrl.create({
      title: 'Warning!',
      subTitle: 'Upload image first.',
      buttons: ['Ok']
    })
    alert.present();
   }
  }
}
