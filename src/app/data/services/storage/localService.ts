import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStore } from '../../stores/localStore';
import { IStore, IStoreService } from "../../model/dataOM";
import { MemoryService } from "./memoryService";

@Injectable({providedIn: "root"})
export class LocalService extends MemoryService implements IStoreService {
  protected store : IStore;
  constructor() 
  {
    super();
    this.store = new LocalStore();
  }

  session   = new BehaviorSubject<any>(null);
  isBrowser = () => typeof window !== "undefined";
  isEmpty   = () => this.store.isEmpty; 
  
  read<T>(key: string) 
  { 
    return this.isBrowser() ? this.store.get<T>(key) : null; 
  }  
  
  write(key: string, data: any) { 
    if (this.isBrowser()) {
      this.store.set(key, data);
    }
  }
  
  clear() {
    if (this.isBrowser()) {
      this.store.clear();
      this.session.next(null);
    }
  }
}
