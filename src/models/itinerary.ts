import { DatesService } from '../utils/dates.service';

export class Itinerary {
  startPlace: string;
  endPlace: string;
  arrivalToday: Date;
  arrivalTime: string;
  private datesService: DatesService = new DatesService();

  constructor() {
    this.startPlace = '';
    this.endPlace = '';
    this.arrivalToday = new Date();
    this.arriveAsap();
  }

  arriveAsap() {
    this.arrivalTime = this.datesService.formatTime();
  }

  arriveInOneHour() {
    const today = new Date();
    const nextHour = (today.getHours()+1) < 10 ? '0' + (today.getHours()+1) : (today.getHours()+1);
    const currentMinutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    this.arrivalTime = currentMinutes + ':' + nextHour;
  }

  startFromCurrentPosition() {
    // TODO add geolocation service here
  }
}
