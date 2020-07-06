import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserServiceService } from '../services/user-service.service';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  usuario;

  constructor(
    public storage: Storage,
    public service: UserServiceService
  ) { }

  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }


  login(username: string, usuario: any): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      //this.setUsername(username);
      this.setUser(usuario);
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }

  // signup(username: string): Promise<any> {
  //   return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
  //     this.setClaveDesencriptadora(username);
  //     return window.dispatchEvent(new CustomEvent('user:signup'));
  //   });
  // }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      //return this.storage.remove('username');
      return this.storage.remove('usuario');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  

  setUser(usuario: any): Promise<any> {
    return this.storage.set('usuario', usuario);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }


  getUser(): Promise<any> {
    return this.storage.get('usuario').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }
}
