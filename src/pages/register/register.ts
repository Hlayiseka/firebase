import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';
import { SnapShots }  from '../../app/Env';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  MyArray = [];
  ref = firebase.database().ref('Hotels/');
  person = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
