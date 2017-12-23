import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, NavParams } from 'ionic-angular';
import { Itinerary } from '../../models/itinerary';
import { TisseoService } from '../../utils/tisseo.service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private geolocation: Geolocation, private tisseoService: TisseoService) { }

  getCurrentPosition() : void {
    this.getXYCoordinates().then(coords =>
      coords != 'NULL' ? this.translateXYCoordinatesToAddress(coords) : console.log("error when getting coords"));
  }

  getXYCoordinates() : Promise<string> {
    return new Promise((resolve, reject) => {
      const options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 0};

      this.geolocation.getCurrentPosition(options).then(position => {
          const coords = position.coords.latitude.toString() + "," + position.coords.longitude.toString();
  				resolve(coords);
  		}, err => reject('NULL'));
    });
  }

  translateXYCoordinatesToAddress(coords) {
    this.tisseoService.getAddressFromCoords(coords).subscribe(address => {
      this.itinerary.startPlace = address;
      this.itinerary.startPlaceXY = coords;
    });
  }

  searchItinerary() : void {
    this.itinerary.setTransportModes(this.transports);
    console.log("Current itinerary => ", this.itinerary);
  }

  ionViewWillLeave() {
		this.itinerary = new Itinerary();
	}

}
