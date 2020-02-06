import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

const config = {
    apiKey: "AIzaSyD4Fib1BXtf4MNMsfjuwNkQdWMPiAeUlgs",
    authDomain: "apartment-auditor.firebaseapp.com",
    databaseURL: "https://apartment-auditor.firebaseio.com",
    projectId: "apartment-auditor",
    storageBucket: "apartment-auditor.appspot.com",
    messagingSenderId: "598732655383",
    appId: "1:598732655383:web:14c91b6ad12be442904552",
    measurementId: "G-84YR19VDBW"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
	AngularFireModule.initializeApp(config),
	AngularFireDatabaseModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
