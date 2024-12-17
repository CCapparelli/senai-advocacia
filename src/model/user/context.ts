import { Injectable, OnInit } from "@angular/core";
import { UsersRepository } from './repository';
import { IContext } from "../data.contracts";
import { IUserData } from "./om";
import { LocalService } from "../../services/data/storage/localService";
import { ObjectStateChanged, ObjectStateChangedInfo } from "../events";
import { Address } from "../shared";

@Injectable({providedIn: "root"})
export class UsersContext implements OnInit, IContext<IUserData> {
    private usersKey    : string = "users";
    private repository  : UsersRepository;

    constructor(private agent : LocalService,
                public objectStateChanged : ObjectStateChanged) {

        this.repository = new UsersRepository(this.objectStateChanged);

        // this.repository.objectStateChanged.raise.subscribe(this.OnObjectStateChanged);
    }

    restoreSession() {
        const persisted = this.agent.read<IUserData[]>(this.usersKey);
        if (persisted) 
            this.repository.list = persisted;

        if (this.repository.isEmpty())
            this.mocData();
    }
    endSession = () => this.agent.clear();

    isEmpty = () => (this.repository.list.length === 0);
    list = () => this.repository.list;

    findUser(userEmail: string) : IUserData|null {
        if (this.isEmpty())
            this.restoreSession();

        return this.repository.list.filter(x => x.email === userEmail)[0];
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
        this.restoreSession();
    }

    OnObjectStateChanged(args: ObjectStateChangedInfo) {
        this.agent.write(this.usersKey, this.repository.list);
        console.log(`Event: ${args.message} - User: ${JSON.stringify(args.data)}`);
    }

    mocData() {
        this.repository.list?.push({name:'Alice', email:'alice.client@acme.com', mobile:'(61)99999 9991', addressInfo: new Address('Rua Direita, 1','São Paulo','SP','70000-001'), roles:['client'], paths:['reports', 'client']});
        this.repository.list?.push({name:'Bob', email:'bob.lawer@acme.com', mobile:'(61)99999 9992', addressInfo: new Address('Rua Direita, 2','São Paulo','SP','70000-002'), roles:['lawer'], paths:['meetings', 'lawer']});
        this.repository.list?.push({name:'Carol', email:'carol.admin@acme.com', mobile:'(61)99999 9993', addressInfo: new Address('Rua Direita, 3','São Paulo','SP','70000-003'), roles:['admin', 'client', 'lawer'], paths:['dashboard', 'reports', 'meetings', 'admin']});
    }
}