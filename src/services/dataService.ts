import { Injectable } from "@angular/core";
import { IUserAuth, IUserData, emptyUserData } from "../model/user/om";
import { UsersContext } from '../model/user/context';
import { Authenticator } from "./auth/authenticator";
import { clientItems } from "./auth/authorizator";


@Injectable({providedIn: "root"})
export class DataServices {
    public currentUser : IUserData | null = null;

  constructor(private context : UsersContext,
              private authenticator : Authenticator
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
    const response = this.authenticator.authenticate(userEmail, password);

    if (response)
      return this.context.findUser(userEmail);

    return null;
  }

  setAsCurrent(userData: IUserData) {
    const user = this.context.findUser(userData.email);
    if (!user) {
      throw new Error(`User not set as current. [${userData.email}]`);
    }
    this.currentUser = user;
  }

  save(userData: IUserData) {
    userData.roles = ['client'];
    userData.paths = clientItems;
    this.context.save(userData);
  }
  
  register(userData: IUserData, userAuth: IUserAuth) {
    userData.roles = ['client'];
    userData.paths = clientItems;
    this.context.register(userData, userAuth);
  }
}