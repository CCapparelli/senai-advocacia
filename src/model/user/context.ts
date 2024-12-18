import { Injectable, OnInit } from "@angular/core";
import { UsersDataRepository } from './repoData';
import { IContext } from "../data.contracts";
import { IUserData, IUserAuth } from "./om";
import { LocalService } from "../../services/data/storage/localService";
import { ObjectStateChanged, ObjectStateChangedInfo } from "../events";
import { Address } from "../shared";

@Injectable({providedIn: "root"})
export class UsersContext implements OnInit, IContext<IUserData> {
    private usersDataKey    : string = "users";
    private dataRepository  : UsersDataRepository;

    constructor(private agent : LocalService,
                public objectStateChanged : ObjectStateChanged) {

        this.dataRepository = new UsersDataRepository(this.objectStateChanged);
    }

    restoreSession() {
        const dataPersisted = this.agent.read<IUserData[]>(this.usersDataKey);
        if (dataPersisted) 
            this.dataRepository.list = dataPersisted;

        if (this.dataRepository.isEmpty()) 
            this.mocData();
    }
    endSession = () => this.agent.clear();

    isEmpty = () => (this.dataRepository.list.length === 0);
    list = () => this.dataRepository.list;

    findUser(userEmail: string) : IUserData|null {
        if (this.isEmpty())
            this.restoreSession();

        return this.dataRepository.list.filter(x => x.email === userEmail)[0];
    }
    findUserAuth(userEmail: string) : IUserData|null {
        if (this.isEmpty())
            this.restoreSession();

        return this.dataRepository.list.filter(x => x.email === userEmail)[0];
    }
    saveOrUptade(obj: IUserData): void {
        this.dataRepository.saveOrUpdate(obj);
    }

    remove(obj: IUserData): void {
        this.dataRepository.remove(obj);
    }
    wipe(): void {
        throw new Error("Method not implemented. Users should not be all wiped out.");
    }
    
    ngOnInit(): void {
        this.restoreSession();
    }

    OnObjectStateChanged(args: ObjectStateChangedInfo) {
        this.agent.write(this.usersDataKey, this.dataRepository.list);
        console.log(`Event: ${args.message} - User: ${JSON.stringify(args.data)}`);
    }

    mocData() {
        if (this.dataRepository.isEmpty()) {
            this.dataRepository.list?.push({name:'Alice', email:'alice.client@acme.com', mobile:'(61)99999 9991', addressInfo: new Address('Rua Direita, 1','São Paulo','SP','70000-001'), roles:['client'], paths:['reports', 'client']});
            this.dataRepository.list?.push({name:'Bob', email:'bob.lawer@acme.com', mobile:'(61)99999 9992', addressInfo: new Address('Rua Direita, 2','São Paulo','SP','70000-002'), roles:['lawer'], paths:['meetings', 'lawer']});
            this.dataRepository.list?.push({name:'Carol', email:'carol.admin@acme.com', mobile:'(61)99999 9993', addressInfo: new Address('Rua Direita, 3','São Paulo','SP','70000-003'), roles:['admin', 'client', 'lawer'], paths:['dashboard', 'reports', 'meetings', 'admin']});
        }
    }
}