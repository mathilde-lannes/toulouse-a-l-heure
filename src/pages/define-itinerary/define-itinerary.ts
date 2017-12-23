import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Itinerary } from '../../models/itinerary';

/**
 * Generated class for the DefineItineraryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-define-itinerary',
  templateUrl: 'define-itinerary.html'
  // providers : [Itinerary]
})
export class DefineItineraryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let iti = new Itinerary();
    console.log('ITI', iti);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DefineItineraryPage');
  }

}
