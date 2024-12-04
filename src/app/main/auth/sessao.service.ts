
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SafeStore } from './auth.model';
import { ISafeData } from "./auth.interface";

@Injectable({providedIn: "root"})
export class SessaoService {
  public safe : SafeStore;

  constructor() {
    this.safe = new SafeStore();

    if (this.isBrowser()) {
      this.restore();
    }
  }

  private session = new BehaviorSubject<ISafeData|null>(null);

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

  save(data: ISafeData) {
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

