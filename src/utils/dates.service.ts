import { Injectable } from '@angular/core';

@Injectable()
export class DatesService {

	getDateAndTime(date) {
		let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
		let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
		let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
		let month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
		return {
			month: month,
			day: day,
			hour: hour,
			minute: minute
		};
	}

	formatDate(date = new Date()) {
		let newDate = this.getDateAndTime(date);
		return date.getFullYear()+'-'+ newDate.month +'-'+ newDate.day;
	}

	formatTime(date = new Date()) {
		let newTime = this.getDateAndTime(date);
		return newTime.hour +':'+ newTime.minute;
	}

	formatFrenchDate(date= new Date()) {
		let newDate = this.getDateAndTime(date);
		return newDate.day +'/'+ newDate.month +'/'+ date.getFullYear();
	}

}
