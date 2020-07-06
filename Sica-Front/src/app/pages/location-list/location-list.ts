import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { LocalizacionService } from '../../services/localizacion.service';
import { AlertController, LoadingController, ModalController, IonRouterOutlet } from '@ionic/angular';
import { Router } from '@angular/router';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UserServiceService } from '../../services/user-service.service';
import { UserData } from '../../providers/user-data';
import { ModalLocationNewPage } from '../modal-location-new/modal-location-new';


@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html',
  styleUrls: ['./location-list.scss'],
})
export class LocationListPage {
  speakers: any[] = [];
  usuario;
  public localizaciones;
  myphoto:any;
  imagen_perfil:any;
  excludeTracks: any = [];

  constructor(public confData: ConferenceData, public service: LocalizacionService, public alertCtrl: AlertController,private route: Router,
    private emailComposer: EmailComposer,private camera: Camera, public loadingCtrl: LoadingController, public serviceUser: UserServiceService,
    public userData: UserData, public modalCtrl: ModalController, public routerOutlet: IonRouterOutlet) {}

  ngOnInit(){
    this.getUser()
    this.presentLoading();
  }

  ionViewWillEnter() { 
    this.getUser();
  
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });
  
    
    this.service.findAll().subscribe((localizaciones: any[]) => {
      localizaciones.forEach(localizacion => {
          this.localizaciones = localizaciones;
    
      });
    });
  }

  getUser() {
    this.userData.getUser().then((usuario) => {
      this.usuario = usuario;
      console.log(this.usuario);
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewWillEnter();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async crearLocalizacion() {
    const modal = await this.modalCtrl.create({
      component: ModalLocationNewPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && (typeof data.nombre !== "undefined")) {
      this.service.save(data).subscribe(response => {
        this.ionViewWillEnter();
      });
      
    }
  }

  // async crearLocalizacion() {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Crear localización',
  //     buttons: [
  //       'Cancel',
  //       {
  //         text: 'Ok',
  //         handler: (data) => {
  //           console.log('Confirm Ok');
  //           const location = {
  //             "nombre":data.nombre,
  //             "descripcion":data.descripcion,
  //             "municipio":this.usuario.municipio,
  //             "idSensores":data.idSensores,
  //             "vuTemp":data.vuTemp,
  //             "vuTurb":data.vuTurb,
  //             "vuCond":data.vuCond,
  //             "lat":data.lat,
  //             "lon":data.lgt,
  //             "estadoBateria":"100",
  //             "temperatura": "00",
  //             "turbidez": "0.000",
  //             "conductividad": "0.000"
  //           }
  //           this.service.save(location).subscribe(response => {
  //             this.route.navigate(['/app/tabs/speakers']);
  //             this.ionViewDidEnter();
  //           })
  //       }
  //     }
  //     ],
  //     inputs: [
  //       {
  //         name: 'nombre',
  //         type: 'text',
  //         placeholder: 'Nombre'
  //       },
  //       {
  //         name: 'idSensores',
  //         type: 'text',
  //         placeholder: 'idSensores'
  //       },
  //       {
  //         name: 'vuTemp',
  //         type: 'text',
  //         placeholder: 'Umbral temperatura'
  //       },
  //       {
  //         name: 'vuTurb',
  //         type: 'text',
  //         placeholder: 'Umbral turbidez'
  //       },
  //       {
  //         name: 'vuCond',
  //         type: 'text',
  //         placeholder: 'Umbral conductividad'
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // async enviarMail() {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Notificar vía Mail',
  //     buttons: [
  //       'Cancel',
  //       {
  //         text: 'Ok',
  //         handler: (data) => {
  //           console.log('Confirm Ok');
  //           let email = {
  //             to: data.to,
  //             cc:data.cc,
  //             subject: data.subj,
  //             body: data.msj,
  //             isHtml: false
  //           }
  //           this.emailComposer.open(email);
  //       }
  //     }
  //     ],
  //     inputs: [
  //       {
  //         name: 'to',
  //         type: 'text',
  //         placeholder: 'Para'
  //       },
  //       {
  //         name: 'cc',
  //         type: 'text',
  //         placeholder: 'CC'
  //       },
  //       {
  //         name: 'subj',
  //         type: 'text',
  //         placeholder: 'Asunto'
  //       },
  //       {
  //         name: 'body',
  //         type: 'textarea',
  //         placeholder: 'Mensaje'
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  takePhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  getImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 2000,
      spinner: "bubbles"
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async enviarMail() {
    const mode = 'ios'; // this.config.get('mode');

    window.open('mailto:');
  }
}
