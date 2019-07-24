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

}