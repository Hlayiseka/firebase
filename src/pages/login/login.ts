import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home'; 
import * as firebase from 'firebase';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('email') user;
  @ViewChild('password') password;

  constructor(public alertctrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  userLogin() {
    firebase.auth().signInWithEmailAndPassword(this.user.value, this.password.value)
    .then(data => {
      console.log("user logged in successfully", data);
      let alert = this.alertctrl.create(
        {
        title: 'New User',
        subTitle: 'You have successfully logged in',
        buttons: ['Ok']
        }
      );
      alert.present();
      this.navCtrl.push(HomePage);
    })
    .catch(error => {
      console.log("User cannot login due to some error", error);
    });
    console.log(this.user.value);
  }
  
  userRegister() {
    this.navCtrl.push(RegisterPage);
  }
}
