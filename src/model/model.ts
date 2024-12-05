import { Injectable } from '@angular/core';
import { IUserData, ISafeUserData } from './interface';
import { of, throwError }                  from "rxjs";
import { Router }                          from "@angular/router";

@Injectable({providedIn: "root"})
export class MocData {
  private _userData: IUserData[] = [];

  constructor() {
    this._userData.push({name:'Alice', pass:'12345', roles:['client'], paths:['reports']});
    this._userData.push({name:'Bob', pass:'12345',   roles:['lawer'], paths:['meetings']});
    
    this._userData.push({name:'Carol', pass:'12345', roles:['admin', 'client', 'lawer'], paths:['dashboard', 'reports', 'meetings']});
  }

  public add = (data: IUserData) => this._userData.push(data);

  public for(userName: string, userPassword: string) : IUserData|null {
    if (userPassword !== '12345') {
      return null;
    }
    const result = this._userData.filter(x => x.name === userName)[0];
    return result;
  }
}

export class SessionStore {
  constructor() {
    this.USER_KEY = "currentUser";
  }
  readonly USER_KEY: string;

  isNotEmpty = () => !this.isEmpty();
  isEmpty    = () => this.getUserData() === null;
  
  clear         = () => sessionStorage.clear();
  clearUserData = () => sessionStorage.setItem(this.USER_KEY, '');

  getData       = (key:string) => sessionStorage.getItem(key);
  setData       = (key:string, data: any) => sessionStorage.setItem(key, JSON.stringify(data));

  getUserData() {
    const value = sessionStorage.getItem(this.USER_KEY);
    if (value) {
      const data: IUserData = JSON.parse(value);
      return data;
    }
    return null;
  }
  setUserData(data: IUserData) {
    const value = JSON.stringify(data);
    sessionStorage.setItem(this.USER_KEY, value);
  }
}

export class SafeSessionStore {
  constructor() {
    this.ACCESS_TOKEN = "auth";
  }
  readonly ACCESS_TOKEN: string;

  isNotEmpty = () => !this.isEmpty();
  isEmpty    = () => this.get() === null;
  clear      = () => sessionStorage.setItem(this.ACCESS_TOKEN, '');

  get() {
    const value = sessionStorage.getItem(this.ACCESS_TOKEN);
    if (value) {
      const data: ISafeUserData = JSON.parse(value);
      return data;
    }
    return null;
  }

  set(data: ISafeUserData) {
    const value = JSON.stringify(data);
    sessionStorage.setItem(this.ACCESS_TOKEN, value);
  }
}

@Injectable({providedIn: "root"})
export class AuthSumulator {
  constructor(
    private mocData : MocData
  ) {}

  // Nota da professora
  // IMPORTANTE: para facilitar o estudo, utilizamos a lógica abaixo, porém, no
  // mundo real haveria uma chamada à uma service para acionar uma API e validar
  // o usuário e senha.
  call(userName: string, userPassword: string) {
    const data  = this.mocData.for(userName, userPassword);
    return data ? of(data) : throwError(() => this.newError(`Usuário ou senha inválido`));
  }
  
  // support/inner methods
  private newError(message: string) {
    const error: any = new Error(message);
    error.timestamp = Date.now();
    return error;
  }
}

@Injectable({providedIn: "root"})
export class ViewUpdater {
  private text : HTMLElement|null;
  private dash : HTMLElement|null;
  private rprt : HTMLElement|null;
  private mtns : HTMLElement|null;

  constructor(private router: Router) {
    this.text = document.getElementById('txt-userName');
    this.dash = document.getElementById('link-dash');
    this.rprt = document.getElementById('link-reports');
    this.mtns = document.getElementById('link-meetings');
  }
 

  reset() {
    if (this.text) {
      this.text.innerText = '';
      this.text.style.display = 'none';
    }
    if (this.dash) {
      this.dash.style.display = 'none';
    }
    if (this.rprt) {
      this.rprt.style.display = 'none';
    }
    if (this.mtns) {
      this.mtns.style.display = 'none';
    }
  }

  update(data: IUserData) {
    if (this.text) {
      this.text.innerText = data.name;
      this.text.style.display = 'block';
    }
    if (this.dash && data.paths.includes('dashboard')) {
      this.dash.style.display = 'block';
    }
    if (this.rprt && data.paths.includes('reports')) {
      this.rprt.style.display = 'block';
    }
    if (this.mtns && data.paths.includes('meetings')) {
      this.mtns.style.display = 'block';
    }
  }
}


