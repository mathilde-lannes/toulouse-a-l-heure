import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, NavParams } from 'ionic-angular';
import { Itinerary } from '../../models/itinerary';
import { TisseoService } from '../../utils/tisseo.service';
import { DatesService } from '../../utils/dates.service';

@Component({
  selector: 'page-define-itinerary',
  templateUrl: 'define-itinerary.html'
})
export class DefineItineraryPage {
  private const TODAY;
  private itinerary = new Itinerary();
	private maximumDate : string;
  private isArrivalASAP : boolean = false;
  private isArrivalInOneHour : boolean = false;
  private transports = {
    metro: true,
    bus: true,
    tramway: true
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private geolocation: Geolocation, private tisseoService: TisseoService,
              private datesService: DatesService) {
    this.TODAY = this.datesService.formatDate();
    let date = new Date();
		date.setMonth(date.getMonth() + 1);
		this.maximumDate = this.datesService.formatDate(date);
  }

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
    if (this.isArrivalASAP) this.itinerary.arriveAsap();
    if (this.isArrivalInOneHour) this.itinerary.arriveInOneHour();
    console.log("Current itinerary => ", this.itinerary);
  }

  getMinimumDepartureTime() {
		if (this.itinerary.arrivalDate == this.TODAY)
			return this.datesService.formatTime();
		else
			return '00:00';
	}

  private changeDate(isOneMoreDay: boolean) {
		let newDate = new Date(this.itinerary.arrivalDate);
		newDate.setDate(isOneMoreDay ? newDate.getDate()+1 : newDate.getDate()-1);
		this.itinerary.arrivalDate = this.datesService.formatDate(newDate);
		this.changeArrivalDate();
	}

	private changeArrivalDate(dateFromDatepicker ?: string) {
		if (dateFromDatepicker)
			this.itinerary.arrivalDate = dateFromDatepicker;
		if (this.itinerary.arrivalDate != this.TODAY) {
			if (this.isArrivalASAP) this.isArrivalASAP = false;
			if (this.isArrivalInOneHour) this.isArrivalInOneHour = false;
		}
	}

  ionViewWillLeave() {
		this.itinerary = new Itinerary();
	}

}
