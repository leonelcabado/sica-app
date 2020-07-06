import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config, MenuController } from '@ionic/angular';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { LocalizacionService } from '../../services/localizacion.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;


  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'Todas';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;
  public localizaciones:any[] = [];
  public localizacionConNoti:any[] = [];
  public localizacionesObservadas:any = [];
  showDetails= false;
  cantidadNotificaciones:number = 0;
  usuario;
  

  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    private alertController: AlertController,
    public service: LocalizacionService,
    private localNotifications: LocalNotifications,
    public userData: UserData,
    private toastController: ToastController,
    public menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.updateSchedule();
    this.service.findAll().subscribe((localizaciones: any[]) => {
      this.localizaciones = localizaciones;
      
    });  
    
    this.ios = this.config.get('mode') === 'ios';
  }

  ionViewWillEnter() { 
    this.menuCtrl.enable(true);
    this.getUser();
    this.updateSchedule();
    this.service.findAll().subscribe((localizaciones: any[]) => {
      this.localizaciones = localizaciones;
      this.lanzarNotificacion();
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

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    // this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
    //   this.shownSessions = data.shownSessions;
    //   this.groups = data.groups;
    // });

     
  }

  procesarNotificaciones(){
    this.localizaciones.forEach(element => {
      
      if(element.notificaciones.length != 0){
        this.localizacionConNoti.push(element);
      }
      
      if(element.notificaciones.length != 0 && element.observable == true){
        this.localizacionesObservadas.push(element);   
      }


    });
    
  }

  async addFavorite(slidingItem: HTMLIonItemSlidingElement, location: any) {
    
    
    console.log(location.id);
    this.localizacionesObservadas.forEach(data => {
      
        this.localizacionesObservadas.push(location);
    
    });

  

    this.updateSchedule();

    // if (this.user.hasFavorite(sessionData.nombre)) {
    //   // Prompt to remove favorite
    //   this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    // } else {
    //   // Add as a favorite
    //   this.user.addFavorite(sessionData.nombre);

      

      // Close the open item
      slidingItem.close();

      // Create a toast
      const add = await this.toastCtrl.create({
        header: `${location.nombre} was successfully added as a favorite.`,
        duration: 3000,
        buttons: [{
          text: 'Close',
          role: 'cancel'
        }]
      });

      // Present the toast at the bottom of the page
      await add.present();
  }

  async deleteFavorite(slidingItem: HTMLIonItemSlidingElement, location: any) {
    const alert = await this.alertCtrl.create({
      header: location.nombre,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            //this.user.removeFavorite(location);
            this.localizacionesObservadas.forEach(element => {
              if(element.id == location.id){
                element.remove();
              }
            });
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    await alert.present();
  }
  

  async observar(location) {
    var msg = "La localización seleccionada ya se encuentra en observación";

    this.localizaciones.forEach(element => {
      if(element.id == location.id && element.observable == false){
        location.observable = true;
        msg = "Se puso en observación a la localizacion: "+location.nombre;
        this.service.updateObs(location,location.id).subscribe(response => {
        });
      }
    });

    const add = await this.toastCtrl.create({
      header: msg,
      duration: 3000,
      buttons: [{
        text: 'Close',
        role: 'cancel'
      }]
    });

    // Present the toast at the bottom of the page
    await add.present();
  }

  async noObservar(location) {
    this.localizaciones.forEach(element => {
      if(element.id == location.id){
        location.observable = false;
        this.service.updateObs(location,location.id).subscribe(response => {
        });
      }
    });
    
    const add = await this.toastCtrl.create({
      header: 'La localización: '+location.nombre+' dejó de observarse',
      duration: 3000,
      buttons: [{
        text: 'Close',
        role: 'cancel'
      }]
    });

    // Present the toast at the bottom of the page
    await add.present();
  }

  public lanzarNotificacion() {

    
    this.localizaciones.forEach(location => {

      if(location.marcaNotificación){
        location.sondas.forEach(sonda => {
          if (sonda.temperatura > location.vuTemp && sonda.turbidez > location.vuTurb && sonda.conductividad > location.vuCond){
            const notificacion = {
              titulo: "Valores por encima del umbral",
              descripcion: "Se detectó que los sensores arrojaron valores que van por encima del umbral establecido se requiere atención",
              importante: true,
              idSonda:sonda.id,
              idLocalizacion: location.id,
              temperatura: sonda.temperatura,
              turbidez: sonda.turbidez,
              conductividad: sonda.conductividad,
              vuTemp: location.vuTemp,
              vuTurb: location.vuTurb,
              vuCond: location.vuCond,
              fechaMuestra: sonda.fechaMuestra,
              estadoBateria: sonda.estadoBateria
            }
            this.service.addNotificacion(location.id, notificacion).subscribe(response => {
            });
            location.marcaNotificación = false;
            this.service.update(location,location.id).subscribe(response => {
            });
            var msj = notificacion.titulo + "\n" + notificacion.descripcion;
          }
  
          if (sonda.turbidez > location.vuTurb && sonda.conductividad > location.vuCond) {
            console.log("ejecución de creación de notificaición");
            const notificacion = {
              titulo: "Valores de turbidez y conductividad por encima del umbral",
              descripcion: "Se detectó que los sensores arrojaron valores que van por encima del umbral establecido se requiere atención",
              importante: true,
              idSonda:sonda.id,
              idLocalizacion: location.id,
              temperatura: sonda.temperatura,
              turbidez: sonda.turbidez,
              conductividad: sonda.conductividad,
              vuTemp: location.vuTemp,
              vuTurb: location.vuTurb,
              vuCond: location.vuCond,
              fechaMuestra: sonda.fechaMuestra,
              estadoBateria: sonda.estadoBateria
            }
            this.service.addNotificacion(location.id, notificacion).subscribe(response => {
            });
            location.marcaNotificación = false;
            this.service.update(location,location.id).subscribe(response => {
            });
            var msj = notificacion.titulo + "\n" + notificacion.descripcion;
          }
  
          
        if (sonda.estadoBateria <= 10) {
          console.log("ejecución de creación de notificaición bateria");
          const notificacion = {
            titulo: "Bateria debajo del 10%",
            descripcion: "Se detectó que el valor de la bateria se encuentra por debajo del nivel mínimo establecido se requiere atención",
            bateria: true,
            importante: true,
            idSonda: sonda.id,
            idLocalizacion: location.id,
            estadoBateria: sonda.estadoBateria
          }
          this.service.addNotificacion(location.id, notificacion).subscribe(response => {
          });
          location.marcaNotificación = false;
          this.service.update(location,location.id).subscribe(response => {
            });
          var msj = notificacion.titulo + "\n" + notificacion.descripcion;
        }
  
        });

      }
      console.log("no se lanzo notificacion por que la marca esta en falso")
      
    });
  //   this.localNotifications.schedule({
  //     text: 'Delayed ILocalNotification',
  //     trigger: {at: new Date(new Date().getTime() + 6600)},
  //     led: 'FF0000',
  //     sound: null
  //  });
  }

  // async eliminarNotificacion(idNoti,localizacion) {
  //   // const alert = await this.alertController.create({
  //   //   header: 'Confirmación Delete',
  //   //   message: '<strong>Desea eliminar la notificación</strong>?',
  //   //   buttons: [
  //   //     {
  //   //       text: 'Cancelar',
  //   //       role: 'cancel', //si presiono fuera de la ventana va por "cancelar"
  //   //       cssClass: 'secondary',
  //   //       handler: () => {
  //   //         console.log('Confirm Cancel');
  //   //       }
  //   //     }, {
  //   //       text: 'Confirmar',
  //   //       handler: () => {
  //   //         console.log('Confirm Okay');
            
  //   //         this.service.deleteNotificacion(localizacion.id,idNoti,localizacion).subscribe(response => {
  //   //          }, error => {
  //   //             console.log("error al elimiinar noti"); 
  //   //           });
  //   //         this.updateSchedule();
            
  //   //       }
  //   //     }
  //   //   ]
  //   // });

  //   this.service.deleteNotificacion(localizacion.id,idNoti,localizacion).subscribe(response => {
  //   });
  //   this.updateSchedule();
  //   this.ionViewDidEnter();
  //   //await alert.present();

  
   
  // }

  async eliminarNotificacion(idNoti,localizacion) {
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

            this.service.deleteNotificacion(localizacion.id,idNoti,localizacion).subscribe(response => {
            }, error => {
                console.log("error al elimiinar noti");
              })

          }
        }
      ]
    });
    await alert.present();
  }
}
