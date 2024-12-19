import { IUserAuth, IUserData } from "./om";

export class UsersAuthRepository { 
    list : IUserAuth[] = [];

    isEmpty = () => (this.list.length === 0);

    save(user: IUserAuth): void {
        var i = this.list.findIndex((x) => x.email === user.email);
        if (i >= 0) 
            throw new Error('Email/user já cadastrado')
        
        this.list.push({email:`${user.email}`,  pass:`${user.pass}`, token:`user${this.list.length}-token`});
    }
    remove(user: IUserData) {
        var i = this.list.findIndex((x) => x.email === user.email);
        this.list.splice(i, 1);
    }

    wipe = () => this.list = [];
}