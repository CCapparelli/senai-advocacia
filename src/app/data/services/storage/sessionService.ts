import { Injectable } from "@angular/core";
import { LocalService } from './localService';
import { SessionStore } from "../../stores/sessionStore";
import { IStore, IStoreService } from "../../model/omData";

@Injectable({providedIn: "root"})
export class SessionService extends LocalService implements IStoreService {
  protected override store : IStore;
  constructor() 
  {
    super();
    this.store = new SessionStore();
  }
}