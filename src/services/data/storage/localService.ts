import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MemoryService } from "./memoryService";
import { IStore, IStoreService } from "../../../model/data.contracts";
import { LocalStore } from "../stores/localStore";

@Injectable({providedIn: "root"})
export class LocalService extends MemoryService implements IStoreService {
  protected override store : IStore;
  constructor() 
  {
    super();
    this.store = new LocalStore();
  }

  session   = new BehaviorSubject<any>(null);
  isBrowser = () => typeof window !== "undefined";
  
  override isEmpty   = () => this.store.isEmpty; 
  
  override  read<T>(key: string) 
  { 
    return this.isBrowser() ? this.store.get<T>(key) : null; 
  }  
  
  override write(key: string, data: any) { 
    if (this.isBrowser()) {
      this.store.set(key, data);
    }
  }
  
  override clear() {
    if (this.isBrowser()) {
      this.store.clear();
      this.session.next(null);
    }
  }
}
