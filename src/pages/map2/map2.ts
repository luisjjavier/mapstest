import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Geolocation, Geoposition} from "@ionic-native/geolocation";

/**
 * Generated class for the Map2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var plugin: any;
declare var cordova: any;

@Component({
  selector: 'page-map2',
  templateUrl: 'map2.html',
})
export class Map2Page {
  @ViewChild('map2') theMap: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform : Platform, public geolocation : Geolocation) {

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {

      this.loadMap();

    });
  }

  done(){
    this.navCtrl.pop();
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
          'tilt': 0,
          'zoom': 11,
          'bearing': 0
        }

      });

      console.log('Map should be loaded.');
      let $target: any = location;
      this.map.one(plugin.google.maps.event.MAP_READY, () => {

        console.log("Map is ready.");
        this.moveMapToLocation($target);

        this.map.on(plugin.google.maps.event.CAMERA_MOVE_END,
          (data: any) => {
            console.log(data);
          }
        );
      });


    });
    console.log('Start loading MAP');


  }
  moveMapToLocation(target: { lat: number, lng: number }) {
    let animateOpt = {
      target: target,
      zoom: 18,
      duration: 1000
    };

    this.map.animateCamera(animateOpt);
  }

}
