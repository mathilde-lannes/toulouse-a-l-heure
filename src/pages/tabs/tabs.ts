import { Component } from '@angular/core';

import { DefineItineraryPage } from '../define-itinerary/define-itinerary';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DefineItineraryPage;

  constructor() {}
}
