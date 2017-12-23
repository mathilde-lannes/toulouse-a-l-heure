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
})
export class DefineItineraryPage {
  private itinerary = new Itinerary();
  private transports = {
    metro: true,
    bus: true,
    tramway: true
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  searchItinerary() : void {
    this.itinerary.setTransportModes(this.transports);
    console.log("Current itinerary => ", this.itinerary);
  }

  ionViewWillLeave() {
		this.itinerary = new Itinerary();
	}

}
