
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MocData, SafeSessionStore, SessionStore } from '../model/model';
import { ISafeUserData, IUserData } from "../model/interface";

@Injectable({providedIn: "root"})
class SessionServices {
  public store : SessionStore;

  constructor() {
    this.store = new SessionStore();

    if (this.isBrowser()) {
      this.restoreUserData();
    }
  }

  protected session = new BehaviorSubject<IUserData|null>(null);

  protected isBrowser = () => typeof window !== "undefined";

  public isEmpty = () => this.store.isEmpty();
  
  restoreUserData() {
    if (this.hasSessionStore()) {
        const data = this.store.getUserData();
        if (data) {
          this.session.next(data);
        }
    }
  }

  public getUserData() : IUserData|null {
    if (this.hasSessionStore()) {
      var result = this.store.getUserData();
      return result;
    }
    return null;
  }
  
  public saveUserData(data: IUserData) {
    if (this.hasSessionStore()) {
      this.store.setUserData(data);
      this.session.next(data);
    }
  }

  public clearUserData() {
    if (this.hasSessionStore()) {
      this.store.clear();
      this.session.next(null);
    }
  }
  
  protected hasSessionStore() {
    if (this.isBrowser()) {
      return true;
    }
    console.warn("SessionStorage não disponível no ambiente atual.");
    return false;
  }
}

@Injectable({providedIn: "root"})
class SessionSafeServices {
  public safe : SafeSessionStore;

  constructor() {
    this.safe = new SafeSessionStore();

    if (this.isBrowser()) {
      this.restore();
    }
  }

  private session = new BehaviorSubject<ISafeUserData|null>(null);

  isBrowser    = () => typeof window !== "undefined";
  // isLogged     = () => this.session.value !== null;
  // get          = () => this.session.asObservable();

  isLogged = () => this.safe.isNotEmpty();
  
  restore() {
    if (this.hasSessionStore()) {
        const data = this.safe.get();
        if (data) {
          this.session.next(data);
        }
    }
  }

  save(data: ISafeUserData) {
    if (this.hasSessionStore()) {
      this.safe.set(data);
      this.session.next(data);
    }
  }

  clear() {
    if (this.hasSessionStore()) {
      this.safe.clear();
      this.session.next(null);
    }
  }
  
  hasSessionStore() {
    if (this.isBrowser()) {
      return true;
    }
    console.warn("SessionStorage não disponível no ambiente atual.");
    return false;
  }
}


@Injectable({providedIn: "root"})
export class DataServices {
  constructor(private safe: SessionSafeServices, 
              private unsafe: SessionServices,
              private mocData: MocData) 
              {
                this.restoreSession();
              }

  hasData = () : boolean => (!this.unsafe.isEmpty() && !this.safe.isLogged());

  restoreSession() {
    this.unsafe.restoreUserData();
    this.safe.restore();
  }
  
  endSession() {
    this.unsafe.clearUserData();
    this.safe.clear();
  }

  getCurrentUser() : IUserData|null {
    var result = this.unsafe.getUserData();
    return result;
  }

  findUser(userName: string, password: string) : IUserData|null {
    var result = this.mocData.for(userName, password);
    return result;
  }

  setAsCurrent(userData: IUserData) {
    const user = this.mocData.for(userData.name, userData.pass);
    if (!user) {
      this.mocData.add(userData);
    }
    this.unsafe.saveUserData(userData);
  }

  register(userName: string, password: string) {
    var newData = { name: userName, pass: password, roles: ['client'], paths: ['reports'] };
    this.mocData.add(newData);
  }
  
  
}