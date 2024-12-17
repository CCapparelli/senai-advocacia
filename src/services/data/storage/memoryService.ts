import { Injectable } from "@angular/core";
import { IStore, IStoreService } from "../../../model/data.contracts";
import { MemoryStore } from "../stores/memoryStore";


@Injectable({providedIn: "root"})
export class MemoryService implements IStoreService {
  protected store : IStore;
  constructor() 
  {
    this.store = new MemoryStore();
  }

  isEmpty = () => this.store.isEmpty; 
  
  read<T>(key: string) 
  { 
    return this.store.get<T>(key); 
  }  
  
  write(key: string, data: any) { 
    this.store.set(key, data);
}
  
  clear() {
    this.store.clear();
  }
}
