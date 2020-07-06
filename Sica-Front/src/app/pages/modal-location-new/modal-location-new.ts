import { Component } from '@angular/core';
import { Config, ModalController, NavParams } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';
import { LocalizacionService } from '../../services/localizacion.service';


@Component({
  selector: 'page-modal-location-new',
  templateUrl: 'modal-location-new.html',
  styleUrls: ['./modal-location-new.scss'],
})
export class ModalLocationNewPage {
  ios: boolean;

  tracks: {name: string, icon: string, isChecked: boolean}[] = [];

  public nombre;
  public descripcion;
  public municipio;
  public idSensores;
  public vuTemp;
  public vuTurb;
  public vuCond;
  public lat;
  public lon;
  public tel;

  constructor(
    public confData: ConferenceData,
    private config: Config,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public service: LocalizacionService
  ) { }

  ionViewWillEnter() {
    this.ios = this.config.get('mode') === `ios`;

  }

  nuevaLocalizacion(){
    const location = {
      "nombre":this.nombre,
      "descripcion":this.descripcion,
      "municipio":this.municipio,
      "idSensores":this.idSensores,
      "vuTemp":this.vuTemp,
      "vuTurb":this.vuTurb,
      "vuCond":this.vuCond,
      "lat":this.lat,
      "lon":this.lon,
      "estadoBateria":"100",
      "temperatura": "00",
      "turbidez": "0.000",
      "conductividad": "0.000"
    }
    this.modalCtrl.dismiss(location);
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }
}
