export interface IStore {
    isEmpty : boolean;
    clear() : void;
    get<T>(key: string) : T|null;
    set(key: string, data: any) : void;
}

export interface IStoreService {
    isEmpty() : boolean;
    clear() : void;
    read<T>(key: string) : T|null;
    write(key: string, data: any) : void;
}
export interface ICRUD<T> {
    list(): T[];
    save(obj : T) : void;
    uptade(obj : T) : void;
    remove(obj : T) : void;
    wipe() : void;
}

// usado por MemoryStore, 
// para emular o comportamento do 
// LocalStorage/SessionStorage
export interface IKeyValue {
    key: string;
    value: string;
}