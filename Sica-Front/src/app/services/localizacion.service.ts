import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'; //para comunicacines http

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  //private uri = 'http://'+window.location.hostname+':9000/api/v1';
  private uri = 'http://192.168.1.54:9000/api/v1';

  constructor(private http: HttpClient) { }

  public findAll(){
    return this.http.get<any>(this.uri+'/list/');
  }

  public find(idLocation){
    return this.http.get<any>(this.uri+'/location/'+idLocation);
  }

  public search(searchLocation){
    return this.http.get<any>(this.uri+'/list/'+searchLocation);
  }

  public update(location,idLocation){
    return this.http.put(this.uri+'/location/update/'+idLocation, location);
  }

  public delete(idLocation){
    return this.http.delete(this.uri+'/location/delete/'+idLocation);
  }

  public save(location){
    return this.http.post(this.uri+'/list',location);
  }

  public addNotificacion(idLocation,notificacion){
    return this.http.post(this.uri+'/list/'+idLocation+'/addNotificacion',notificacion);
  }

  public deleteNotificacion(idLocation,idNotificacion,location){
    return this.http.put(this.uri+'/list/'+idLocation+'/deleteNotificacion/'+idNotificacion,location);
  }

  public updateObs(location,idLocation){
    return this.http.put(this.uri+'/location/obs/'+idLocation, location);
  }
  
  public deleteSonda(idLocation,idSonda,location){
    return this.http.put(this.uri+'/list/'+idLocation+'/deleteSonda/'+idSonda,location);
  }
  
}
