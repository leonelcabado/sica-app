import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { UserServiceService } from '../../services/user-service.service';
import { LoadingController, MenuController, ToastController, AlertController } from '@ionic/angular';

import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  public usuarios;
  passDesencriptada: string;
  decPassword:string;

  constructor(
    public userData: UserData,
    public router: Router,
    public service: UserServiceService,
    public loadingCtrl: LoadingController,
    private toastController: ToastController,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController
  ) { }
  
  ionViewWillEnter(){
    this.menuCtrl.enable(false);
    this.service.findAllUser().subscribe(response => {
      this.usuarios = response;
  })
  }

  async onLogin(form: NgForm) {
    this.submitted = true;
    const loading = await this.loadingCtrl.create({
      message: 'Ingresando...',
      duration: 3000,
      spinner: "bubbles"
    });
    if (form.valid) {
      let ok: boolean = false;
      this.usuarios.forEach(usu => {
        
        // this.decPassword = usu.password.substring(usu.password.length-3, usu.password.length);
        // console.log(this.decPassword);
        // this.passDesencriptada = CryptoJS.AES.decrypt(usu.password.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
        // console.log(this.passDesencriptada);
        if (usu.fullname == this.login.username && usu.password == this.login.password) {
          ok = true;
          this.userData.login(this.login.username,usu); //guardo en sqllite stoorage el usuario para usarlo como session 
          loading.present();
          this.router.navigateByUrl('/app/tabs/schedule');
        }

        if(!ok){this.presentToast("danger","Usuario o contraseña incorrectos");}else{this.presentToast("success","Bienvenido a SICA")};

      });   
    }
    
    form.reset();
  }

  async presentToast(color,msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      color: color
    });
    toast.present();
  }
  
  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  

  async reestablecer() {
      const alert = await this.alertCtrl.create({
        header: 'Reestablecer contraseña',
        buttons: [
          'Cancel',
          {
            text: 'Ok',
            handler: (data) => {
              console.log('Confirm Ok');
              this.service.sendMail(data.to).subscribe(response => {
                this.presentToastSendMsj();
            })
          }
        }
        ],
        inputs: [
          {
            name: 'to',
            type: 'text',
            placeholder: 'Ingrese correo'
          }
        ]
      });
      await alert.present();
    }

    async presentToastSendMsj() {
      const toast = await this.toastController.create({
        message: 'Correo enviado satisfactoriamente',
        duration: 2000,
        color: "success"
      });
      toast.present();
    }

  generarClave(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
}
