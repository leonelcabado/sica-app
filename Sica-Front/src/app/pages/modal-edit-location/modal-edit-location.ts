import { Component } from '@angular/core';
import { Config, ModalController, NavParams } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';
import { LocalizacionService } from '../../services/localizacion.service';


@Component({
  selector: 'page-modal-edit-location',
  templateUrl: 'modal-edit-location.html',
  styleUrls: ['./modal-edit-location.scss'],
})
export class ModalEditLocationPage {
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

  editLocalizacion(){
    if(typeof this.nombre === "undefined"){this.nombre = null;};
    if(typeof this.descripcion === "undefined"){this.descripcion = null;};
    if(typeof this.municipio === "undefined"){this.municipio = null;};
    if(typeof this.idSensores === "undefined"){this.idSensores = null;};
    if(typeof this.vuTemp === "undefined"){this.vuTemp = null;};
    if(typeof this.vuTurb === "undefined"){this.vuTurb = null;};
    if(typeof this.vuCond === "undefined"){this.vuCond = null;};
    if(typeof this.vuCond === "undefined"){this.lat = null;};
    if(typeof this.vuCond === "undefined"){this.lon = null;};

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
      "telefono":this.tel,
    }
    this.modalCtrl.dismiss(location);
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }
}
