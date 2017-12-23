import { DatesService } from '../utils/dates.service';

export class Itinerary {
  startPlace: string;
  startPlaceXY: string;
  endPlace: string;
  arrivalDate: string;
  arrivalTime: string;
  transportMode: TransportMode[];
  private datesService: DatesService = new DatesService();

  constructor() {
    this.startPlace = '';
    this.startPlaceXY = '';
    this.endPlace = '';
    this.arrivalDate = this.datesService.formatDate();
    this.arriveAsap();
    this.transportMode = [];
  }

  arriveAsap() : void {
    this.arrivalTime = this.datesService.formatTime();
  }

  arriveInOneHour() : void {
    const today = new Date();
    const nextHour = (today.getHours()+1) < 10 ? '0' + (today.getHours()+1) : (today.getHours()+1);
    const currentMinutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    this.arrivalTime = currentMinutes + ':' + nextHour;
  }

  getTransportModes() : string {
    return this.transportMode.join();
  }

  setTransportModes(transports) : void {
    if (transports.metro) this.transportMode.push(TransportMode.Metro);
    if (transports.bus) this.transportMode.push(TransportMode.Bus);
    if (transports.tramway) this.transportMode.push(TransportMode.Tramway);
  }
}

enum TransportMode {
  Metro = "13792273858822586",
  Bus = "13792273858822585",
  Tramway = "13792273858822588",
}
