import { Injectable } from "@angular/core";
import { LocalService } from './localService';
import { IStore, IStoreService } from "../../../model/data.contracts";
import { SessionStore } from "../stores/sessionStore";


@Injectable({providedIn: "root"})
export class SessionService extends LocalService implements IStoreService {
  protected override store : IStore;
  constructor() 
  {
    super();
    this.store = new SessionStore();
  }
}