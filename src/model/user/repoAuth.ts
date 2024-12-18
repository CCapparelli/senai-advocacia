import { ObjectStateChanged, ObjectStateChangedInfo } from "../events";
import { IUserAuth } from "./om";

export class UsersAuthRepository { 
    list : IUserAuth[] = [];

    constructor(public objectStateChanged : ObjectStateChanged) {}
    
    isEmpty = () => (this.list.length === 0);

    saveOrUpdate(user: IUserAuth): void {
        var i = this.list.findIndex((x) => x.email === user.email);
        if (i >= 0) 
            this.list[i] = user;
        else 
            this.list.push(user);

        this.objectStateChanged.raise.next(new ObjectStateChangedInfo('savedOrUpdated', user));
    }

    remove(user: IUserAuth) {
        var i = this.list.findIndex((x) => x.email === user.email);
        this.list.splice(i, 1);

        this.objectStateChanged.raise.next(new ObjectStateChangedInfo('removed', user));
    }

    wipe = () => this.list = [];
}