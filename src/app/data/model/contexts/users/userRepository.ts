import { IUserData } from "../../entities/omUser";    
import { ObjectStateChanged, ObjectStateChangedInfo } from "../../appEvents";

export class UsersRepository { 
    list : IUserData[] = [];

    constructor(public objectStateChanged : ObjectStateChanged) {}
    
    saveOrUpdate(user: IUserData): void {
        var i = this.list.findIndex((x) => x.email === user.email);
        if (i >= 0) 
            this.list[i] = user;
        else 
            this.list.push(user);

        this,this.objectStateChanged.raise.next(new ObjectStateChangedInfo('savedOrUpdated', user));
    }

    remove(user: IUserData) {
        var i = this.list.findIndex((x) => x.email === user.email);
        this.list.splice(i, 1);

        this.objectStateChanged.raise.next(new ObjectStateChangedInfo('removed', user));
    }

    wipe = () => this.list = [];
}