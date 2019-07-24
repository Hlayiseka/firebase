import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, PopoverController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';
import { SnapShots }  from '../../app/Env';
import { Camera, CameraOptions } from '@ionic-native/camera'; 

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('email') user;
  @ViewChild('password') password;
  @ViewChild('name') name;
  @ViewChild('surname') surname;
  @ViewChild('age') age;
  @ViewChild('img') img;

  MyArray = [];
  ref = firebase.database().ref('Hotels/');
  person = {};
  url: string;
  captureDataUrl: string;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController, 
    private camera: Camera, 
    public navParams: NavParams,
    public loading: LoadingController,
    public popover: PopoverController
    ) {

    this.ref.on('value', res => {
      this.MyArray = SnapShots(res);
    });
  }
  add(obj){
    if(obj!==null && obj!==undefined){
      let person = this.ref.push();
      person.set(obj);
      this.person = {};
    }
  }
  delete(key){
    firebase.database().ref('Hotels/'+ key).remove();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  userRegister() {
    firebase.auth().createUserWithEmailAndPassword(this.user.value, this.password.value)
    .then(data => {
      console.log("User registered successfully,", data);
      this.navCtrl.push(LoginPage);
      this.person = {};
    })
    .catch(error => {
      console.log("Error registering user", error);
    })
    console.log(this.user.value);

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
    
    this.camera.getPicture(options).then((captureDataUrl) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let imageUploaded = 'data:image/jpeg;base64,' + captureDataUrl;
     
     this.captureDataUrl = imageUploaded;
     
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
    const imageRef = storageRef.child(`my-hotel/${filename}.jpg`);
    loaders.present()
    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
    .then((snapshot) => {
      console.log('image uploaded');
      this.url = snapshot.downloadURL
      let alert = this.alertCtrl.create({
        title: 'Image Upload', 
        subTitle: 'Image Uploaded to firebase',
        buttons: ['Ok']
      }).present();
    })
  }
}
