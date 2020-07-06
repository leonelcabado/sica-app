import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js'
import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { LocalizacionService } from '../../services/localizacion.service';
import { AlertController, ToastController, IonSlides, Platform, LoadingController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';



@Component({
  selector: 'page-notification-detail',
  styleUrls: ['./notification-detail.scss'],
  templateUrl: 'notification-detail.html'
})
export class NotificationDetailPage {
  session: any;
  isFavorite = false;
  defaultHref = '';
  idNotificacion;
  notificacion;
  localizacion;
  chart: any;
  public rojo:string = 'rgba(255, 99, 132, 0.3)';
  public azul:string = "rgba(54, 162, 235, 0.3)";
  public amarillo:string = "rgba(255, 206, 86, 0.3)";
  public rojoBorde:string = 'rgba(255, 99, 132)';
  public azulBorde:string = "rgba(54, 162, 235)";
  public amarilloBorde:string = "rgba(255, 206, 86)";
  bateria;
  currentImage = null;

  @ViewChild('slides', null) slides: IonSlides;

  sliderConfig = {
    spaceBetween: 0,
    centeredSlides: true,
    slidesPerView: 1.1
    
  }
  downloadText: string;
  fileTranfer: FileTransferObject;
  clickedImagePath: any;
  
  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public confData: ConferenceData,
    public service: LocalizacionService,
    private alertController: AlertController,
    private router: Router,
    public toastCtrl: ToastController,
    private emailComposer: EmailComposer,
    private transfer: FileTransfer,
    private file: File,
    private camera: Camera,
    private platform: Platform,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit(){
    console.log("estoy en ngoninit");
    this.presentLoading();
  }

  ionViewWillEnter() {
    console.log("estoy en willenter");
    this.idNotificacion = this.route.snapshot.paramMap.get('notificationId');
    
    this.service.findAll().subscribe((localizaciones: any) => {
        localizaciones.forEach(localizacion => {
          localizacion.notificaciones.forEach(notificacion => {
              if(notificacion.id == this.idNotificacion){
                this.notificacion = notificacion;
                this.localizacion = localizacion;
                this.bateria = notificacion.bateria;
                if(this.bateria){this.generarChartIdeal(this.notificacion.estadoBateria,100-this.notificacion.estadoBateria,'rgb(49, 226, 49, 0.8)','rgb(49, 226, 49, 1)',"doughnut","DoughnutChart");}
                else{this.generarChartIdeal(this.notificacion.temperatura,this.notificacion.vuTemp,this.rojo,this.rojoBorde,"pie","polarAreaTemp");
                this.generarChartIdeal(this.notificacion.turbidez,this.notificacion.vuTurb,this.azul,this.azulBorde,"pie","polarAreaTurb");
                this.generarChartIdeal(this.notificacion.conductividad,this.notificacion.vuCond,this.amarillo,this.amarilloBorde,"pie","polarAreaCond");
                }
                }
          });
        });
    });

    
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/schedule`;
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


  sessionClick(item: string) {
    console.log('Clicked', item);
  }

  toggleFavorite() {
    if (this.localizacion.observable) {
      this.isFavorite = false;
    } else {
      this.isFavorite = true;
    }
  }

  shareSession() {
    console.log('Clicked share session');
  }

  async contactoNotificacion() {
    
    const alert = await this.alertController.create({
      header: 'Mail de contacto',
      inputs: [
        {
          name: 'para',
          type: 'text',
          placeholder: 'Para'
        }],
        message: "Texto a enviar: \n"+this.notificacion.descripcion,
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
              subject: "Contacto por advertencia de contaminacion en "+this.localizacion.nombre,
              body: this.notificacion.descripcion,
              isHtml: false
            }
            this.emailComposer.open(email);
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarNotificacion() {
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

            this.service.deleteNotificacion(this.localizacion.id,this.idNotificacion,this.localizacion).subscribe(response => {
             }, error => {
                console.log("error al elimiinar noti");
              });
              this.router.navigate(['/app/tabs/schedule']);
              add.present()
          }
        }
      ]
    });
    
    await alert.present();

    const add = await this.toastCtrl.create({
      header: "La notificación se elimino correctamente",
      duration: 3000,
      buttons: [{
        text: 'Close',
        role: 'cancel'
      }]
    });
   
  }

  async observar() {
    var msg = "La localización seleccionada ya se encuentra en observación";


      if(this.localizacion.observable == false){
        this.localizacion.observable = true;
        msg = "Se puso en observación a la localizacion: "+this.localizacion.nombre;
        this.service.updateObs(this.localizacion,this.localizacion.id).subscribe(response => {
        });
      }

    const add = await this.toastCtrl.create({
      header: msg,
      duration: 3000,
      buttons: [{
        text: 'Close',
        role: 'cancel'
      }]
    });
    await add.present()
  }

  public generarChartIdeal(valor,valorIdeal,color,colorBorde,tchart,elemento){
    this.chart = new Chart(elemento, {
      type: tchart,
      data: {
          labels: ['Ideal: '+valorIdeal,'Actual: '+valor],
          datasets: [{
              data: [valorIdeal,valor],
              backgroundColor: [
                'rgb(49, 226, 49, 0.3)',
                color
                
              ],  
              borderColor: [
                'rgb(98, 190, 55)',
                colorBorde
              ],
              borderWidth: 1
          }]
      },
      options: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 25,
            
          }
          
        },
        scales: {
              yAxes: [{
                gridLines:{
                  display:false
                },
                  ticks: {
                      beginAtZero: true,
                      display: false    
                  }
              }],
              xAxes: [{
                gridLines:{
                  display:false
                },
                  ticks: {
                      beginAtZero: true,
                      display: false   
                  }
              }]
          }
      }
  });
  }

  // downloadCanvas(event,pos) {
  //   // get the `<a>` element from click event
  //   var anchor = event.target;
  //   var sensor;
  //   if(pos == 0){sensor="Temperatura"}else if(pos == 1){sensor="Turbidez"}else if(sensor==2){sensor="Conductividad"}else{sensor="Bateria"};
  //   // get the canvas, I'm getting it by tag name, you can do by id
  //   // and set the href of the anchor to the canvas dataUrl
  //   anchor.href = document.getElementsByTagName('canvas')[pos].toDataURL('image/jpeg', 1.0);
  //   // set the anchors 'download' attibute (name of the file to be downloaded)
  //   anchor.download = "gráficoNotificacion-"+sensor+".jpg";
  // }

  // downloadCanvas(event,pos) {
  //   // get the `<a>` element from click event
  //   var anchor = event.target;
  //   var sensor;
  //   if(pos == 0){sensor="Temperatura"}else if(pos == 1){sensor="Turbidez"}else if(sensor==2){sensor="Conductividad"}else{sensor="Bateria"};
  //   // get the canvas, I'm getting it by tag name, you can do by id
  //   // and set the href of the anchor to the canvas dataUrl
  //   anchor.href = document.getElementsByTagName('canvas')[pos].toDataURL('image/jpeg', 1.0);
  //   // set the anchors 'download' attibute (name of the file to be downloaded)
  //   anchor.download = "gráficoNotificacion-"+sensor+".jpg";
    
  // }

  async enviarMail() {
    var body = "Valores actuales al momento de la notificación \n"+"Fecha de cración de notificación: "+this.notificacion.fecha+"\nTemperatura: "+this.notificacion.temperatura+"/"+this.notificacion.vuTemp+"\nTurbidez: "+this.notificacion.turbidez+"/"+this.notificacion.vuTurb+"\nConductividad: "+this.notificacion.conductividad+"/"+this.notificacion.vuCond+"\nBateria: "+this.notificacion.estadoBateria+"%"+"\nFecha de muestra: "+this.notificacion.fechaMuestra;
    var asunto = "Advertencia en arroyo "+this.localizacion.nombre+": "+this.notificacion.titulo;
    const alert = await this.alertController.create({
      header: 'Notificar advertencia en arroyo: '+this.localizacion.nombre,
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
