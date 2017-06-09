import { Component, ElementRef,ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import {Geolocation, Geoposition} from '@ionic-native/geolocation'
import {DetailsPage} from "../details/details";
import {LoginPage} from "../login/login";

declare var plugin: any;
declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') theMap: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, public platform: Platform,public geolocation : Geolocation,
  public menuCtrl : MenuController) {
    platform.ready().then(() => {

      this.loadMap();

    });
  }

getNextPage(){
    this.navCtrl.push(DetailsPage);
}
  loadMap() {

    this.geolocation.getCurrentPosition().then((data : Geoposition) => {
      let location = {
        lat:data.coords.latitude,
        lng : data.coords.longitude
      };
      let mapEle = this.theMap.nativeElement;
      this.map = new plugin.google.maps.Map.getMap(mapEle, {

        'mapType': plugin.google.maps.MapTypeId.NORMAL,
        'controls': {
          'compass': true,
          'myLocationButton': false,
          'indoorPicker': false,
          'zoom': true
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          'latLng': location,
          'tilt': 0,
          'zoom': 11,
          'bearing': 0
        }

      });

      console.log('Map should be loaded.');

      this.map.one(plugin.google.maps.event.MAP_READY, () => {

        console.log("Map is ready.");

      });


    });
    console.log('Start loading MAP');


  }

  getLoginPage(){
     this.navCtrl.push(LoginPage);
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }

}
