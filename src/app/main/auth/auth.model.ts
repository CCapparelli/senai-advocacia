import { Injectable } from '@angular/core';
import { IRolePaths, ISafeData, IUserRoles } from './auth.interface';
import { of, throwError }                  from "rxjs";
import { Router }                          from "@angular/router";

@Injectable({providedIn: "root"})
export class DataStore {
  private _userRoles: IUserRoles[] = [];
  private _rolePaths: IRolePaths[] = [];

  constructor() {
    this._userRoles.push({name:'Alice', roles:['client', 'guess']});
    this._userRoles.push({name:'Bob', roles:['member', 'lawer']});
    this._userRoles.push({name:'Carol', roles:['admin', 'client', 'guess', 'member', 'lawer']});
  
    this._rolePaths.push({role:'client', paths:['reports']});
    this._rolePaths.push({role:'lawer', paths:['meetings']});
    this._rolePaths.push({role:'admin', paths:['dashboard']});}

  // por enquanto estamos desconsiderando o campo senha (cf. abaixo).
  public dataFor(userName: string, userPassword: string) : ISafeData|null {
    if (userPassword !== '12345') {
      return null;
    }
    const userRoles = this.rolesFor(userName);
    if (!userRoles) {
      return null;
    }  

    let paths = [];
    for (let i = 0; i < userRoles.length; i++) {
      let rolePaths = this.pathsFor(userRoles[i]);
      if (rolePaths) {
        for (let j = 0; j < rolePaths.length; j++) {
          paths.push(rolePaths[j])
        }
      }
    }  
    return {name: userName, accessToken: 'Password', roles: userRoles, paths: paths };
  }

  private rolesFor(userName: string): string[] {
    let user = this._userRoles.filter(x => x.name === userName)[0];
    return user?.roles;
  }
  
  private pathsFor(roleName: string): string[] {
    let role = this._rolePaths.filter(x => x.role === roleName)[0];
    return role?.paths;
  }}

export class SafeStore {
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
      const data: ISafeData = JSON.parse(value);
      return data;
    }
    return null;
  }

  set(data: ISafeData) {
    const value = JSON.stringify(data);
    sessionStorage.setItem(this.ACCESS_TOKEN, value);
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

  update(data: ISafeData) {
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

@Injectable({providedIn: "root"})
export class ApiSumulator {
  constructor(
    private dataStore : DataStore
  ) {}

  // IMPORTANTE: para facilitar o estudo, utilizamos a lógica abaixo, porém, no
  // mundo real haveria uma chamada à uma service para acionar uma API e validar
  // o usuário e senha.
 call(userName: string, userPassword: string) {
    const data  = this.dataStore.dataFor(userName, userPassword);
    return data ? of(data) : throwError(() => this.newError(`Usuário ou senha inválido`));
  }
  
  // support/inner methods
  private newError(message: string) {
    const error: any = new Error(message);
    error.timestamp = Date.now();
    return error;
  }
}
