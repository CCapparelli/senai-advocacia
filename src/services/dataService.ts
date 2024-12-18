import { Injectable } from "@angular/core";
import { IUserData, emptyUserData } from "../model/user/om";
import { UsersContext } from '../model/user/context';
import { AuthSumulator } from "./data/moc/auth.simulator";


@Injectable({providedIn: "root"})
export class DataServices {
    public currentUser : IUserData | null = null;

  constructor(private context : UsersContext,
              private authenticator : AuthSumulator
  ) {}

  hasData = () : boolean => (!this.context.isEmpty());
  hasUser = () : boolean => this.currentUser !== null;
  
  restoreSession() {
    this.context.restoreSession();
    this.currentUser = null;
  }
  endSession() {
    this.currentUser = null;
    this.context.endSession();
  }

  authenticate(userEmail: string, password: string) : IUserData|null {
    const token = this.authenticator.call(userEmail, password);
    // se não retornou erro é porque validou o usuário.
    
    return this.context.findUser(userEmail);
  }

  

  setAsCurrent(userData: IUserData) {
    const user = this.context.findUser(userData.email);
    if (!user) {
      this.context.saveOrUptade(userData)
    }
    this.currentUser = user;
  }

  register(userName: string, password: string) {
    var newData = emptyUserData;
    newData.name = userName; 
    newData.roles = ['client'];
    newData.paths = ['reports'];
    this.context.saveOrUptade(newData);
  }
}