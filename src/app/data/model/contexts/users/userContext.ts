import { Injectable, OnInit } from "@angular/core";
import { LocalService } from "../../../services/storage/localService";
import { SessionService } from "../../../services/storage/sessionService";
import { MemoryService } from "../../../services/storage/memoryService";
import { Address } from "../../entities/omRoot";    
import { IUserData } from "../../entities/omUser";    
import { IContext } from "../../dataOM";    
import { ObjectStateChanged, ObjectStateChangedInfo } from "../../appEvents";
import { UsersRepository } from './userRepository';

@Injectable({providedIn: "root"})
export class UserLocalContext implements OnInit, IContext<IUserData> {
    private usersKey    : string = "users";
    private repository  : UsersRepository;

    public          list        : IUserData[];
    public readonly emptyObj    : IUserData = {email: '', name: '', mobile: '', addressInfo: new Address('','','','')};


    constructor(private agent : LocalService,
                public objectStateChanged : ObjectStateChanged) {

        this.repository = new UsersRepository(this.objectStateChanged);
        this.list = this.repository.list;
        
        this.seedUsers();
    }

    saveOrUptade(obj: IUserData): void {
        this.repository.saveOrUpdate(obj);
    }
    remove(obj: IUserData): void {
        this.repository.remove(obj);
    }
    wipe(): void {
        throw new Error("Method not implemented. Users should not be all wiped out.");
    }
    
    ngOnInit(): void {
        var persisted = this.agent.read<IUserData[]>(this.usersKey);
        if (persisted)
            this.repository.list = persisted;

        this.repository.objectStateChanged.raise.subscribe(this.OnObjectStateChanged);
    }

    OnObjectStateChanged(args: ObjectStateChangedInfo) {
        this.agent.write(this.usersKey, this.repository.list);
        console.log(`Event: ${args.message} - User: ${JSON.stringify(args.data)}`);
    }

    seedUsers() {
        this.repository.list?.push({email: 'user-1@acme.com', name: 'User One', mobile: '61 99999 9999', addressInfo: new Address('Rua Direita, 1','São Paulo','SP','70000-000')})
        this.repository.list?.push({email: 'user-2@acme.com', name: 'User Two', mobile: '61 99999 9999', addressInfo: new Address('Rua Direita, 1','São Paulo','SP','70000-000')})
        this.repository.list?.push({email: 'user-3@acme.com', name: 'User Three', mobile: '61 99999 9999', addressInfo: new Address('Rua Direita, 1','São Paulo','SP','70000-000')})
    }
}