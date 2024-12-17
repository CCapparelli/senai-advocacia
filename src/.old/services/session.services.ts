
// import { Injectable, OnInit } from "@angular/core";
// import { BehaviorSubject } from "rxjs";
// import { MocData, SafeSessionStore, SessionStore } from '../model/model';
// import { IUserAuth, IUserData } from "../app/data/model/entities/omUser";

// @Injectable({providedIn: "root"})
// class SessionServices {
//   public store : SessionStore;

//   constructor() {
//     this.store = new SessionStore();

//     if (this.isBrowser()) {
//       this.restoreUserData();
//     }
//   }

//   protected session = new BehaviorSubject<IUserData|null>(null);

//   protected isBrowser = () => typeof window !== "undefined";

//   public isEmpty = () => this.store.isEmpty();
  
//   restoreUserData() {
//     if (this.hasSessionStore()) {
//         const data = this.store.getUserData();
//         if (data) {
//           this.session.next(data);
//         }
//     }
//   }

//   public getUserData() : IUserData|null {
//     if (this.hasSessionStore()) {
//       var result = this.store.getUserData();
//       return result;
//     }
//     return null;
//   }
  
//   public saveUserData(data: IUserData) {
//     if (this.hasSessionStore()) {
//       this.store.setUserData(data);
//       this.session.next(data);
//     }
//   }

//   public clearUserData() {
//     if (this.hasSessionStore()) {
//       this.store.clear();
//       this.session.next(null);
//     }
//   }
  
//   protected hasSessionStore() {
//     if (this.isBrowser()) {
//       return true;
//     }
//     console.warn("SessionStorage não disponível no ambiente atual.");
//     return false;
//   }
// }

// @Injectable({providedIn: "root"})
// class SessionSafeServices {
//   public safe : SafeSessionStore;

//   constructor() {
//     this.safe = new SafeSessionStore();

//     if (this.isBrowser()) {
//       this.restore();
//     }
//   }

//   private session = new BehaviorSubject<IUserAuth|null>(null);

//   isBrowser    = () => typeof window !== "undefined";
//   // isLogged     = () => this.session.value !== null;
//   // get          = () => this.session.asObservable();

//   isLogged = () => this.safe.isNotEmpty();
  
//   restore() {
//     if (this.hasSessionStore()) {
//         const data = this.safe.get();
//         if (data) {
//           this.session.next(data);
//         }
//     }
//   }

//   save(data: IUserAuth) {
//     if (this.hasSessionStore()) {
//       this.safe.set(data);
//       this.session.next(data);
//     }
//   }

//   clear() {
//     if (this.hasSessionStore()) {
//       this.safe.clear();
//       this.session.next(null);
//     }
//   }
  
//   hasSessionStore() {
//     if (this.isBrowser()) {
//       return true;
//     }
//     console.warn("SessionStorage não disponível no ambiente atual.");
//     return false;
//   }
// }


