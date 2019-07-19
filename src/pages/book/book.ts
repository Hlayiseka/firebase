import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { HomePage }  from '../home/home';

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {

  // @ViewChild('children') user;
  // @ViewChild('adults') adults;
  // @ViewChild('checkIn') checkIn;
  // @ViewChild('chrckOut') checkOut;
  
  MyArray = [];
  ref = firebase.database().ref('Hotels/');
  booking = {};

  constructor(public alertctrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }
  userBook() {
    this.navCtrl.push(BookPage);
  }

  add(obj){
    if(obj!==null && obj!==undefined){
      let booking = this.ref.push();
      booking.set(obj);
      this.booking = {};
    }
    let alert = this.alertctrl.create(
      {
      subTitle: 'You have successfully booked a room',
      buttons: ['Ok']
      }
    );
    alert.present();
    this.navCtrl.push(HomePage);
  }
}
