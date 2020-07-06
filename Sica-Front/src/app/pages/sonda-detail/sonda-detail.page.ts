import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, IonSlides, ToastController } from '@ionic/angular';
import { LocalizacionService } from '../../services/localizacion.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-sonda-detail',
  templateUrl: './sonda-detail.page.html',
  styleUrls: ['./sonda-detail.page.scss'],
})
export class SondaDetailPage implements OnInit {

  idSonda;
  public sonda: any;
  sondas: any;
  public idLocation;
  defaultHref = '';
  public lTemperatura = [];
  public lTurbidez = [];
  public lConductividad = [];
  public lhora:string[] = [];
  public lbateria:string[] = [];
  localizacion: any;
  private intervalUpdate: any = null;
  myphoto:any;

  @ViewChild('slides', null) slides: IonSlides;

  sliderConfig = {
    spaceBetween: 0,
    centeredSlides: false,
    slidesPerView: 1
    
  }
  @ViewChild('lineCanvasHistorico',null) lineCanvasHistorico;
  @ViewChild('lineCanvasBateria',null) lineCanvasBateria;

  lineChartHistorico : any;
  lineChartBateria : any;


  constructor(
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public service: LocalizacionService,
    private alertController: AlertController,
    private router: Router,
    private emailComposer: EmailComposer,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) { }


    ngOnInit(){
      this.presentLoading();
    }

    ionViewWillEnter() {

    this.idSonda = this.route.snapshot.paramMap.get('sondaId');
    this.service.findAll().subscribe((localizaciones: any) => {
        localizaciones.forEach(localizacion => {
          localizacion.sondas.forEach(sonda => {
              if(sonda.id == this.idSonda){
                this.sonda = sonda;
                this.localizacion = localizacion;
                this.defaultHref = `/app/tabs/speakers/speaker-details/`+this.localizacion.id;

                this.lTemperatura = this.sonda.historico[0];
                this.lTurbidez = this.sonda.historico[1];
                this.lConductividad = this.sonda.historico[2];
                this.lhora = this.sonda.historico[3];
                this.lbateria = this.sonda.historico[4];

                this.lineChartHistorico = this.getlineChartHistorico();
                this.lineChartBateria = this.getlineChartBateria();
             }
          });
        });
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

    getChartHistorico(context, chartType, dataFirst,dataSecond,dataTercer) {
      return new Chart(context, {
        type: chartType,
        data: {
          labels: this.lhora,
          datasets: [dataFirst, dataSecond, dataTercer]
        },
        options: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 15
            }
          },
          scales: {
            xAxes: [{
              gridLines:{
                display:false
              },
              ticks: {
                beginAtZero: false,
                fontSize:10,             
              }
            }],
            yAxes: [{
              display:false,
              gridLines:{
                display:false
              },
              ticks: {
                beginAtZero: false,
                fontSize:9,              
              }
            }]
          },
  
        }
      });
    }
  
    getlineChartHistorico(){
      var dataFirst = {
        label: "Temperatura",
        lineTension: 0,
        data: this.lTemperatura,
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 2,
      };
  
      var dataSecond = {
        label: "Turbidez",
        lineTension: 0,
        data: this.lTurbidez,
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 2
      };
  
      var dataTercer = {
        label: "Conductividad",
        lineTension: 0,
        data: this.lConductividad,
        backgroundColor: "rgba(255, 206, 86, 0.3)",
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 2,
      };
      return this.getChartHistorico(this.lineCanvasHistorico.nativeElement, 'line', dataFirst,dataSecond,dataTercer);
    }
  
    getChartBateria(context, chartType, dataFirst) {
      return new Chart(context, {
        type: chartType,
        data: {
          labels: this.lhora,
          datasets: [dataFirst]
        },
        options: {
          legend: {
            display: false,
            position: 'bottom',
            labels: {
              boxWidth: 15
            }
          },
          scales: {
            xAxes: [{
              gridLines:{
                display:false
              },
              ticks: {
                beginAtZero: false,
                fontSize:10,             
              }
            }],
            yAxes: [{
              display:false,
              gridLines:{
                display:false
              },
              ticks: {
                beginAtZero: false,
                fontSize:9,              
              }
            }]
          },
  
        }
      });
    }
  
    getlineChartBateria(){
      var dataFirst = {
        label: "Consumo de bateria",
        lineTension: 0,
        data: this.lbateria,
        backgroundColor: "rgb(49, 226, 49, 0.3)",
        borderColor: [
          'rgba(0, 255, 0, 1)',
          'rgb(49, 226, 49)',
          'rgb(49, 226, 49)',
          'rgb(49, 226, 49)',
          'rgb(49, 226, 49)',
          'rgb(49, 226, 49)'
        ],
        borderWidth: 2,
      };
      return this.getChartBateria(this.lineCanvasBateria.nativeElement, 'line', dataFirst);
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

    async eliminarSonda() {
      const alert = await this.alertController.create({
        header: 'Confirmación Delete',
        message: '<strong>Desea eliminar la sonda</strong>?',
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
  
              this.service.deleteSonda(this.localizacion.id,this.idSonda,this.localizacion).subscribe(response => {
               }, error => {
                  console.log("error al eliminar sonda");
                });
                this.router.navigate([`/app/tabs/speakers/speaker-details/`+this.localizacion.id]);
                add.present()
            }
          }
        ]
      });
      
      await alert.present();
  
      const add = await this.toastCtrl.create({
        header: "La sonda se elimino correctamente",
        duration: 3000,
        buttons: [{
          text: 'Close',
          role: 'cancel'
        }]
      });
     
    }

    async enviarMail() {
      var body = "Valores actuales \n"+"Identificador de sonda: "+this.sonda.id+"\nTemperatura: "+this.sonda.temperatura+"/"+this.localizacion.vuTemp+"\nTurbidez: "+this.sonda.turbidez+"/"+this.localizacion.vuTurb+"\nConductividad: "+this.sonda.conductividad+"/"+this.localizacion.vuCond+"\nBateria: "+this.sonda.estadoBateria+"%"+"\nFecha de muestra: "+this.sonda.fechaMuestra;
      var asunto = "Notificación de valores actuales en arroyo "+this.localizacion.nombre;
      const alert = await this.alertController.create({
        header: 'Notificar valores actuales',
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
