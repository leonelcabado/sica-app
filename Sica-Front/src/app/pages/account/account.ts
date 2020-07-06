import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { UserData } from '../../providers/user-data';
import { UserServiceService } from '../../services/user-service.service';

import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements AfterViewInit{
  username: string;
  id: string;
  usuario;
  passEncriptada: string;
  encPassword: string;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    private alertController: AlertController,
    public service: UserServiceService
  ) { }

  ngAfterViewInit() {
    this.getUser();
  }

  ionViewWillEnter(){
    this.getUser();
  }


  updatePicture() {
    console.log('Clicked to update picture');
  }


  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing


  async modificarUsuario() {
    const alert = await this.alertController.create({
      header: 'Editar '+"",//this.usuario.nombre,
      inputs: [
        {
          name: 'usuario',
          type: 'text',
          placeholder: "Nuevo nombre de usuario",
          value:this.usuario.fullname
        },
        {
          name: 'email',
          type: 'text',
          placeholder: "Nuevo correo",
          value:this.usuario.email
        },
        {
          name: 'pass1',
          type: 'password',
          placeholder: 'Nueva contraseña'
        },
        {
          name: 'pass2',
          type: 'password',
          placeholder: 'Repetir nueva contraseña'
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
            this.usuario.email = data.email;
            this.usuario.fullname = data.usuario;
            this.usuario.password = data.pass2
            this.service.update(this.usuario,this.usuario.id).subscribe(response => {
            
            });
            this.setUser(this.usuario);
            this.ionViewWillEnter();
          }
        }
      ]
    });

    await alert.present();
  }

  getUser() {
    this.userData.getUser().then((usuario) => {
      this.usuario = usuario;
    });
  }
  setUser(usuario) {
    this.userData.setUser(usuario).then((usuario) => {
      this.usuario = usuario;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.router.navigateByUrl('/login');
  }
}
