import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { Map, tileLayer, marker, icon, L } from 'leaflet';
import { map } from 'rxjs/operators';

import { darkStyle } from './map-dark-style';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalizacionService } from '../../services/localizacion.service';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage {
  map: Map;
  localizaciones:any = [];

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public confData: ConferenceData,
    public platform: Platform,
    public http: HttpClient,
    public router: Router,
    public service: LocalizacionService) {}
  
    ionViewDidEnter(){ //por que corre aca ver?
      this.service.findAll().subscribe((localizaciones: any[]) => {
        this.localizaciones = localizaciones;
        this.initMap(this.localizaciones);
      });
      
    }

    initMap(localizaciones) {
      //const map = new Map('map').setView([-34.765113, -58.2838663], 23);
      this.map = new Map('map').setView([-34.801515, -58.190407], 10);

      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
  
      const customMarkerIcon = icon({
        iconUrl: 'assets/img/speakers/icon_arroyos.png',
        iconSize: [64, 64], 
        popupAnchor: [0, -20]
      });
      console.log(this.localizaciones);
      localizaciones.forEach((localizacion) => {
        marker([localizacion.lat, localizacion.lon], {icon: customMarkerIcon})
        .bindPopup(`<b>${localizacion.nombre}</b>`)
        //.on('click', () => this.router.navigateByUrl('/app/tabs/speakers/speaker-details/'+localizacion.id))
        .addTo(this.map).openPopup();
      });
    }

    ionViewWillLeave() {
      this.map.remove();
    }
//   async ngAfterViewInit() {

//     const appEl = this.doc.querySelector('ion-app');
//     let isDark = false;
//     let style = [];
//     if (appEl.classList.contains('dark-theme')) {
//       style = darkStyle;
//     }

//     const googleMaps = await getGoogleMaps(
//       'AIzaSyB7G4AHTGARsebPNJZArOsnQes83jjmra8'
//     );

//     let map;

//     this.confData.getMap().subscribe((mapData: any) => {
//       const mapEle = this.mapElement.nativeElement;

//       map = new googleMaps.Map(mapEle, {
//         center: mapData.find((d: any) => d.center),
//         zoom: 16,
//         styles: style
//       });

//       mapData.forEach((markerData: any) => {
//         const infoWindow = new googleMaps.InfoWindow({
//           content: `<h5>${markerData.name}</h5>`
//         });

//         const marker = new googleMaps.Marker({
//           position: markerData,
//           map,
//           title: markerData.name
//         });

//         marker.addListener('click', () => {
//           infoWindow.open(map, marker);
//         });
//       });

//       googleMaps.event.addListenerOnce(map, 'idle', () => {
//         mapEle.classList.add('show-map');
//       });
//     });

//     const observer = new MutationObserver((mutations) => {
//       mutations.forEach((mutation) => {
//         if (mutation.attributeName === 'class') {
//           const el = mutation.target as HTMLElement;
//           isDark = el.classList.contains('dark-theme');
//           if (map && isDark) {
//             map.setOptions({styles: darkStyle});
//           } else if (map) {
//             map.setOptions({styles: []});
//           }
//         }
//       });
//     });
//     observer.observe(appEl, {
//       attributes: true
//     });
    
//   }
// }

// function getGoogleMaps(apiKey: string): Promise<any> {
//   const win = window as any;
//   const googleModule = win.google;
//   if (googleModule && googleModule.maps) {
//     return Promise.resolve(googleModule.maps);
//   }

//   return new Promise((resolve, reject) => {
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);
//     script.onload = () => {
//       const googleModule2 = win.google;
//       if (googleModule2 && googleModule2.maps) {
//         resolve(googleModule2.maps);
//       } else {
//         reject('google maps not available');
//       }
//     };
//   });
}

