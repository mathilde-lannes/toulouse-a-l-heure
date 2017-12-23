import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AgmCoreModule, MarkerManager, GoogleMapsAPIWrapper } from '@agm/core';
import { MyApp } from './app.component';

import { DatesService } from '../utils/dates.service';
import { Itinerary } from '../models/itinerary';
import { DefineItineraryPage } from '../pages/define-itinerary/define-itinerary';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    DefineItineraryPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBZy_Kh6RYilomKy-kitN85n7yWwSLzLLc'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DefineItineraryPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MarkerManager,
    DatesService,
    GoogleMapsAPIWrapper,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
