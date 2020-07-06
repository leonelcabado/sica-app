import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reestablish-password',
  templateUrl: './reestablish-password.page.html',
  styleUrls: ['./reestablish-password.page.scss'],
})
export class ReestablishPasswordPage implements OnInit {

  public password_rt;
  public password;
  submitted = false;
  correo;
  public usuario: any;

  constructor(private service: UserServiceService,private route: ActivatedRoute,private toastController: ToastController,public router: Router) { }

  ngOnInit() {
    this.correo = this.route.snapshot.paramMap.get('correo');
    this.service.findAllUser().subscribe((usuarios: any) => {
      usuarios.forEach(usuario => {
        if(usuario.email == this.correo){
          this.usuario = usuario;
          console.log(this.usuario);
        }
      });
    });
  }

  reestablecer(){
    this.submitted = true;

    if(typeof this.usuario === "undefined"){
      this.router.navigate(['/login']);
      this.presentToast("danger","Error al modificar contraseña, no se encontró usuario")
    }else {
      this.usuario.password = this.password_rt;
      this.service.update(this.usuario,this.usuario.id).subscribe(response => { 
        this.router.navigate(['/login']);
        this.presentToast("success","Contraseña Modificada Satisfactoriamente");
      });
    }
  }

  async presentToast(color,msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: color
    });
    toast.present();
  }

}
