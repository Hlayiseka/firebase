import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { SnapShots }  from '../../app/Env';
import { BookPage } from '../book/book';
/**
 * Generated class for the RoomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html',
})
export class RoomsPage {

  MyArray = [];
  ref = firebase.database().ref('Hotels/');
  room = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ref.on('value', res => {
      this.MyArray = SnapShots(res);
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomsPage');
  }
  add(obj){
    if(obj!==null && obj!==undefined){
      let room = this.ref.push();
      room.set(obj);
      this.room = {};
    }
  }
  userRooms() {
    this.navCtrl.push(RoomsPage);
  }
  userBook() {
    this.navCtrl.push(BookPage);
  }
}
