import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, NavParams } from 'ionic-angular';
import { Itinerary } from '../../models/itinerary';
import { TisseoService } from '../../utils/tisseo.service';
import { DatesService } from '../../utils/dates.service';
import { AlertsService } from '../../utils/alerts.service';

@Component({
  selector: 'page-define-itinerary',
  templateUrl: 'define-itinerary.html'
})
export class DefineItineraryPage {
  private TODAY;
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
              private datesService: DatesService, private alertsService: AlertsService) {
    this.TODAY = this.datesService.formatDate();
    let date = new Date();
		date.setMonth(date.getMonth() + 1);
		this.maximumDate = this.datesService.formatDate(date);
  }

  getCurrentPosition() : void {
    this.getXYCoordinates()
      .then(coordsAndAlert => this.translateXYCoordinatesToAddress(coordsAndAlert))
      .catch(err => {
        console.log("[ERROR] ", err.message);
        err.alert.dismiss();
        this.alertsService.geolocationErrorAlert(false);
      });
  }

  getXYCoordinates() : Promise<any> {
    return new Promise((resolve, reject) => {
      let alert = this.alertsService.geolocationAlert();
      const options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 0};

      this.geolocation.getCurrentPosition(options)
      .then(position => {
          const coords = position.coords.latitude.toString() + "," + position.coords.longitude.toString();
          let coordsAndAlert = {coords: coords, alert: alert};
  				return resolve(coordsAndAlert);
  		})
      .catch(err => reject({message: err.message, alert: alert}));
    });
  }

  translateXYCoordinatesToAddress(coordsAndAlert) {
    this.tisseoService.getAddressFromCoords(coordsAndAlert.coords).subscribe(address => {
      this.itinerary.startPlace = address;
      this.itinerary.startPlaceXY = coordsAndAlert.coords;
      coordsAndAlert.alert.dismiss();
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
