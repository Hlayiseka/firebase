import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { GalleryPage } from '../gallery/gallery';
import { RoomsPage } from '../rooms/rooms';
import { AddPage } from '../add/add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  

  constructor(public navCtrl: NavController) {
   
  }
  userRegister() {
    this.navCtrl.push(RegisterPage);
   
  }

  userLogin() {
    this.navCtrl.push(LoginPage);
  }
 
  userGallery() {
    this.navCtrl.push(GalleryPage);
  }
  userRooms() {
    this.navCtrl.push(RoomsPage);
  }
  add() {
    this.navCtrl.push(AddPage);
  }
}
