import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

// ObjectStateChanged
@Injectable({providedIn: 'root'})
export class ObjectStateChanged {
    raise: Subject<ObjectStateChangedInfo> = new Subject();
}
export class ObjectStateChangedInfo {
    message: string;
    data: any;

    constructor (message: string, data: any) {  
        this.message = message;
        this.data = data;
    }
}

//
