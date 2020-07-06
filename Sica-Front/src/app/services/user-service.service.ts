import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'; //para comunicacines http

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  //private uri = 'http://'+window.location.hostname+':9000/api/v1';
  private uri = 'http://192.168.1.54:9000/api/v1';
  public idUser;

  constructor(private http: HttpClient) { }

  public registrarUser(usuario){
    return this.http.post(this.uri+'/usuario/registrar/',usuario);
  }

  public deleteUser(idUser){
    return this.http.delete(this.uri+'/usuario/delete/'+idUser);
  }

  public findUser(idUser){
    return this.http.get<any>(this.uri+'/usuario/'+idUser);
  }
  public findAllUser(){
    return this.http.get<any>(this.uri+'/list-user/');
  }

  public update(usuario,idUsuario){
    return this.http.put(this.uri+'/usuario/update/'+idUsuario, usuario);
  }

  public sendMail(correo){
    return this.http.post('http://192.168.1.54:9000/sendMail', correo);
  }
}
