import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { DatesService } from './dates.service';


@Injectable()
export class AlertsService {
	constructor(private alertCtrl: AlertController,
				private datesService: DatesService) {}

	geolocationAlert() {
		let alert = this.alertCtrl.create({
			    title: 'Géolocalisation',
			    subTitle: '<br>Nous recherchons vos coordonnées GPS, merci de patienter.'
		});
		alert.present();
		return alert;
	}

	geolocationErrorAlert(isAlertForGeolocatingAFavorite) {
		const text = isAlertForGeolocatingAFavorite ?
		  'Merci de choisir un autre favori.' :
		  'Merci de renseigner le champ \'Lieu de départ\'.';

		let alertGeolocalisation = this.alertCtrl.create({
		    title: 'Géolocalisation impossible',
		    subTitle: '<br>Navrés, nous ne pouvons pas vous géolocaliser. ' + text,
		    buttons: ['Ok']
		  });

		  alertGeolocalisation.present();
	}
}
