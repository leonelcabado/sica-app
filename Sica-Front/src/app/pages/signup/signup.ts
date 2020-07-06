import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { UserServiceService } from '../../services/user-service.service';
import { ToastController, MenuController } from '@ionic/angular';

import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '' };
  public password_rt;
  public email_usu;
  public municipio_usu;
  submitted = false;
  passEncriptada: string;

  municipios = ["Almirante Brown" ,"Avellaneda" ,"Berazategui" ,"Berisso" ,"Brandsen" ,"Campana" ,"Cañuelas" ,"Ensenada" ,"Escobar" ,"Esteban Echeverría" ,"Florencio Varela" ,"General Las Heras" ,"General Rodríguez" ,"General San Martín" ,"Hurlingham" ,"Ituzaingó" ,"José C. Paz" ,"La Matanza" ,"Lanús" ,"La Plata" ,"Lobos","Lomas de Zamora" ,"Luján" ,"Malvinas Argentinas" ,"Marcos Paz" ,"Mercedes" ,"Merlo" ,"Moreno" ,"Morón" ,"Navarro" ,"Pilar", "Presidente Perón", "Quilmes", "San Fernando", "San Isidro", "San Miguel", "San Vicente", "Tigre", "Tres de Febrero", "Vicente López", "Zárate"];
 
  encPassword: string;
  

  constructor(
    public router: Router,
    public userData: UserData,
    private service: UserServiceService,
    private toastController: ToastController
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {

      // this.encPassword = this.generarClave(3);
      // this.passEncriptada = CryptoJS.AES.encrypt(this.password_rt.trim(), this.encPassword.trim()).toString();
      // console.log(this.passEncriptada);
      const usuario = {
        "email": this.email_usu,
        "fullname": this.signup.username,
        "municipio": this.municipio_usu,
        "password": this.signup.password
      }
  
      this.service.registrarUser(usuario).subscribe(response => {
        this.router.navigate(['/login']);
        this.presentToast();
  
      });

      //this.userData.signup(this.signup.username,);
      // this.router.navigateByUrl('/app/tabs/schedule');
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuario Creado Satisfactoriamente',
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
