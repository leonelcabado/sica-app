import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';
import { ActionSheetController, AlertController, LoadingController, IonSlides, IonRouterOutlet, ModalController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LocalizacionService } from '../../services/localizacion.service';
import * as Chart from 'chart.js';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalEditLocationPage } from '../modal-edit-location/modal-edit-location';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';





@Component({
  selector: 'page-location-detail',
  templateUrl: 'location-detail.html',
  styleUrls: ['./location-detail.scss'],
})
export class LocationDetailPage {
  sonda_visible = false;
  sondas: any;
  public idLocation;
  public notificaciones;
  location: any;
  myphoto:any;




  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    public service: LocalizacionService,
    private alertController: AlertController,
    private router: Router,
    private emailComposer: EmailComposer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public routerOutlet: IonRouterOutlet,
    public modalCtrl: ModalController,
    private callNumber: CallNumber,
    private sms: SMS
  ) {}

  ngOnInit(){
    this.presentLoading();
  }

  ionViewDidEnter() {
    
    this.idLocation = this.route.snapshot.paramMap.get('locationId');
    this.service.find(this.idLocation).subscribe((data: any) => {
      this.location = data;
      this.sondas = this.location.sondas;
      // if(this.location.temperatura == null){
      //   this.location.temperatura = "00";
      // }
      // if(this.location.turbidez == null){
      //   this.location.turbidez = "0.000";
      // }
      // if(this.location.conductividad == null){
      //   this.location.conductividad = "0.000";
      // }
      // if(this.location.estadoBateria == null){
      //   this.location.estadoBateria = "";
      // }
    });

    this.service.find(this.idLocation).subscribe((localizacion: any) => {

      this.notificaciones = localizacion.notificaciones;


      // this.notificaciones = localizacion.notificaciones;
      // this.lTemperatura = localizacion.matriz[0];
      // this.lTurbidez = localizacion.matriz[1];
      // this.lConductividad = localizacion.matriz[2];
      // this.lhora = localizacion.matriz[3];
      // this.lbateria = localizacion.matriz[4];
    });

    

  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewDidEnter();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  
  openExternalUrl(url: string) { //para compartir en redes sociales borrar
    this.inAppBrowser.create(
      url,
      '_blank'
    );
  }

  async editLocalizacion() {
    const modal = await this.modalCtrl.create({
      component: ModalEditLocationPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data);
      this.service.update(data,this.location.id).subscribe(response => {
        this.ionViewDidEnter();
      });
      
    }
  }

  async updateLocalizacion() {
    const alert = await this.alertController.create({
      header: 'Editar '+this.location.nombre,
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder:"Nombre",
          value: this.location.nombre
        },
        {
          name: 'descripcion',
          type: 'textarea',
          placeholder:"Descripción",
          value: this.location.descripcion
        },
        {
          name: 'idSensores',
          type: 'text',
          placeholder:"Id Sensores",
          value: this.location.idSensores
        },
        {
          name: 'nvuTemp',
          type: 'text',
          placeholder:"Umbral temperatura",
          value: this.location.vuTemp
        },
        {
          name: 'nvuTurb',
          type: 'text',
          placeholder:"Umbral turbidez",
          value: this.location.vuTurb
        },
        {
          name: 'nvuCond',
          type: 'text',
          placeholder:"Umbral conductividad",
          value: this.location.vuCond
        },
        {
          name: 'nlat',
          type: 'text',
          placeholder:"Latitud",
          value: this.location.lat
        },
        {
          name: 'nlgn',
          type: 'text',
          placeholder:"Longitud",
          value: this.location.lon
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok');
            const location = {
              "nombre":data.nombre,
              "descripcion":data.descripcion,
              "idSensores":data.idSensores,
              "vuTemp":data.nvuTemp,
              "vuTurb":data.nvuTurb,
              "vuCond":data.nvuCond,
              "lat":data.nlat,
              "lon":data.nlgn
            }
            this.service.update(location,this.location.id).subscribe(response => {
              this.ionViewDidEnter();
              //this.ngOnInit();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteLocalizacion() {
    const alert = await this.alertController.create({
      header: 'Confirmación Eliminar',
      message: '<strong>Desea eliminar la localización: '+this.location.nombre+'?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel', //si presiono fuera de la ventana va por "cancelar"
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            console.log('Confirm Okay');

            this.service.delete(this.idLocation).subscribe(response => {
            }, error => {
              
            });
            this.router.navigate(['/app/tabs/locations']);
          }
        }
      ]
    });

    await alert.present();
  }

  // async enviarMail() {
  //   const alert = await this.alertController.create({
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
  //         type: 'text',
  //         placeholder: 'Mensaje'
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  async openContact() {
    const mode = 'ios'; // this.config.get('mode');

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Contacto ' + this.location.nombre,
      buttons: [
        {
          text: `Email ( ${this.location.nombre} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            //window.open('mailto:' + this.location.nombre);

          }
        },
        {
          text: `Llamar ( 1160174150 )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            //window.open('tel:' + 1160174150);
            this.callNumber.callNumber("1160174150", true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
          }
        },
        {
          text: `SMS ( 1160174150 )`,
          icon: mode !== 'ios' ? 'SMS' : null,
          handler: () => {
            //window.open('tel:' + 1160174150);
            this.sms.send("1160174150", "Mensaje")
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async presentAlertDeleteNoti(idNotificacion) {
    const alert = await this.alertController.create({
      header: 'Confirmación Delete',
      message: '<strong>Desea eliminar la notificación</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel', //si presiono fuera de la ventana va por "cancelar"
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            console.log('Confirm Okay');

            this.service.deleteNotificacion(this.idLocation,idNotificacion,this.location).subscribe(response => {
              this.ionViewDidEnter();
             }, error => {
                console.log("error al elimiinar noti");
              })

          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertMailNoti(notificacion) {
    
    const alert = await this.alertController.create({
      header: 'Mail de contacto',
      inputs: [
        {
          name: 'para',
          type: 'text',
          placeholder: 'Para'
        }],
        message: "Texto a enviar: \n"+notificacion.descripcion,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Enviar',
          handler: (data) => {
            console.log('Confirm Ok');
            let email = {
              to: data.para,
              subject: "Contacto por advertencia de contaminación en"+this.location.nombre,
              body: notificacion.descripcion,
              isHtml: false
            }
            this.emailComposer.open(email);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertDetalle(notificacion) {
    
    const alert = await this.alertController.create({
      header: 'Detalle notificación (sonda:'+notificacion.idSonda+')',
      message: "Descripción: "+notificacion.descripcion+"\n Para más detalle dirigirse a pestalla de notificaciones.",
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alert.present();
  }

  downloadCanvas(event,pos) {
    // get the `<a>` element from click event
    var anchor = event.target;
    var chart;
    if(pos == 0){chart="Historico"}else if(pos == 1){chart="Bateria"};
    // get the canvas, I'm getting it by tag name, you can do by id
    // and set the href of the anchor to the canvas dataUrl
    anchor.href = document.getElementsByTagName('canvas')[pos].toDataURL('image/jpeg', 1.0);
    // set the anchors 'download' attibute (name of the file to be downloaded)
    anchor.download = "gráfico-"+chart+".jpg";
  }

  async cambiarImg() {
    const mode = 'ios'; // this.config.get('mode');

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Editar imgen: ' + this.location.nombre,
      buttons: [
        {
          text: `Tomar foto`,
          icon: mode !== 'ios' ? 'camera' : null,
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: `Agregar desde galeria`,
          icon: mode !== 'ios' ? 'image' : null,
          handler: () => {
            this.getImage();
          }
        },
        {
          text: `Reestablecer`,
          icon: mode !== 'ios' ? 'image' : null,
          handler: () => {
            this.location.imagen = "/assets/img/localizacion_background.jpg";
            this.service.update(this.location,this.location.id).subscribe(response => {
              this.ionViewDidEnter();
          //this.ngOnInit();
        });
        
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

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
      this.location.imagen = this.myphoto;
      this.service.update(this.location,this.location.id).subscribe(response => {
        this.ionViewDidEnter();
          //this.ngOnInit();
        });
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
      this.location.imagen = this.myphoto;
      this.service.update(this.location,this.location.id).subscribe(response => {
        console.log("estoy por galeria")
        this.ionViewDidEnter();
        //this.ngOnInit();
      });
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

  showSonda(){
    if(!this.sonda_visible){this.sonda_visible = true;}
    else{this.sonda_visible = false;}
  }

  async enviarMail(notificacion) {

    var body = "Valores actuales al momento de la notificación \n"+"Fecha de cración de notificación: "+notificacion.fecha+"\nTemperatura: "+notificacion.temperatura+"/"+notificacion.vuTemp+"\nTurbidez: "+notificacion.turbidez+"/"+notificacion.vuTurb+"\nConductividad: "+notificacion.conductividad+"/"+notificacion.vuCond+"\nBateria: "+notificacion.estadoBateria+"%"+"\nFecha de muestra: "+notificacion.fechaMuestra;
    var asunto = "Advertencia en arroyo "+this.location.nombre+": "+notificacion.titulo;
    const alert = await this.alertController.create({
      header: 'Notificar advertencia en arroyo: '+this.location.nombre,
      buttons: [
        'Cancelar',
        {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok');
            let email = {
              to: data.to,
              cc:data.cc,
              subject: asunto,
              body: body,
              isHtml: false
            }
            this.emailComposer.open(email);
        }
      }
      ],
      inputs: [
        {
          name: 'to',
          type: 'text',
          placeholder: 'Para'
        },
        {
          name: 'cc',
          type: 'text',
          placeholder: 'CC'
        }
      ]
    });
    await alert.present();
  }


}
